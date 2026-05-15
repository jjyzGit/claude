import {DocumentProcessingStatus, ExtractionRunStatus} from '@sollapay/enums';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useRef, useState} from 'react';

import {documentProcessingKeys} from '@/features/documents';
import {useApiClient} from '@/hooks';

import {extractionApi} from '../api';
import {buildAiRunEvaluations, isEmptyAiValue} from '../utils';

import type {AiSuggestion} from '../types';
import type {DocumentProcessingStatusDto, ExtractionRunDto} from '@sollapay/types';
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form';

interface UseAiFormSessionParams<TFieldValues extends FieldValues = FieldValues> {
  documentStatuses: Array<DocumentProcessingStatusDto | undefined>;
  getValues: UseFormGetValues<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  /** Maps API targetField to form field key. Defaults to returning targetField as-is. Return null to skip. */
  resolveField?: (targetField: string) => string | null;
  /** Converts extracted string to the form field's value type. Defaults to identity. */
  toFieldValue?: (field: string, extractedValue: string) => string;
  /** Overrides the empty-value predicate. Defaults to null/undefined/blank string. */
  isEmptyValue?: (value: unknown) => boolean;
  /** Called after each batch of completed runs is processed. */
  onSuggestionsApplied?: (autoFilledCount: number) => void;
}

const DEFAULT_RESOLVE_FIELD = (targetField: string): string => targetField;

const DEFAULT_TO_FIELD_VALUE = (_field: string, v: string): string => v;

// Persists processed run IDs across remounts so cancel → reopen skips already-handled runs.
const PROCESSED_RUNS_QC_KEY = ['ai-form-session', 'processed-run-ids'] as const;

/**
 * Manages AI extraction state for react-hook-form forms.
 * Processes completed extraction runs, auto-fills empty fields, tracks modifications,
 * and exposes submitEvaluations / clearAiState for save and cancel flows.
 */
export function useAiFormSession<TFieldValues extends FieldValues = FieldValues>(
  params: UseAiFormSessionParams<TFieldValues>
) {
  const resolveField = params.resolveField ?? DEFAULT_RESOLVE_FIELD;
  const toFieldValue = params.toFieldValue ?? DEFAULT_TO_FIELD_VALUE;
  const isEmpty = params.isEmptyValue ?? isEmptyAiValue;

  const {documentStatuses, onSuggestionsApplied} = params;

  // Refs keep latest form methods without triggering effect re-runs.
  const getValuesRef = useRef(params.getValues);
  getValuesRef.current = params.getValues;
  const setValueRef = useRef(params.setValue);
  setValueRef.current = params.setValue;

  const [aiFields, setAiFields] = useState(() => new Map<string, AiSuggestion>());
  const [autoFilledFields, setAutoFilledFields] = useState(() => new Set<string>());
  const [modifiedFields, setModifiedFields] = useState(() => new Set<string>());

  // Maps runId → documentId for use in submitEvaluations.
  const documentIdByRunIdRef = useRef(new Map<string, string>());

  const client = useApiClient();
  const queryClient = useQueryClient();

  // Seed from QueryClient on mount so cancel → remount doesn't re-process prior runs.
  const processedRunIdsRef = useRef(
    new Set<string>(queryClient.getQueryData<string[]>(PROCESSED_RUNS_QC_KEY) ?? [])
  );

  useEffect(() => {
    const newRuns: Array<{run: ExtractionRunDto; documentId: string}> = [];

    for (const status of documentStatuses) {
      if (!status?.context || !('extractionRun' in status.context)) continue;
      const run = status.context.extractionRun;

      if (
        run.status === ExtractionRunStatus.COMPLETED &&
        run.evaluation === null &&
        !processedRunIdsRef.current.has(run.id)
      ) {
        newRuns.push({run, documentId: run.documentId});
      }
    }

    if (newRuns.length === 0) return;

    const suggestions = new Map<string, AiSuggestion>();
    const formUpdates: Array<{field: string; value: string}> = [];
    const newlyFilledFields = new Set<string>();

    for (const {run, documentId} of newRuns) {
      documentIdByRunIdRef.current.set(run.id, documentId);

      for (const s of run.suggestions) {
        const fieldKey = resolveField(s.targetField);
        if (fieldKey === null || suggestions.has(fieldKey)) continue; // first run wins per field

        const currentValue = getValuesRef.current(fieldKey as Path<TFieldValues>);
        const convertedValue = toFieldValue(fieldKey, s.extractedValue);

        const suggestion: AiSuggestion = {
          value: s.extractedValue,
          confidence: s.confidence,
          targetField: s.targetField,
          runId: run.id
        };

        if (isEmpty(currentValue)) {
          formUpdates.push({field: fieldKey, value: convertedValue});
          newlyFilledFields.add(fieldKey);
          suggestions.set(fieldKey, suggestion);
        } else if (String(currentValue ?? '') === String(convertedValue)) {
          // Field already matches suggestion (e.g. remounted after save) — badge only.
          suggestions.set(fieldKey, suggestion);
        }
        // Pre-existing different value — no badge, no override.
      }
    }

    newRuns.forEach(({run}) => processedRunIdsRef.current.add(run.id));

    if (suggestions.size === 0) return;

    for (const {field, value} of formUpdates) {
      setValueRef.current(
        field as Path<TFieldValues>,
        value as PathValue<TFieldValues, Path<TFieldValues>>,
        {shouldDirty: true}
      );
    }

    setAiFields(prev => new Map([...prev, ...suggestions]));

    if (newlyFilledFields.size > 0) {
      setAutoFilledFields(prev => new Set([...prev, ...newlyFilledFields]));
    }

    onSuggestionsApplied?.(newlyFilledFields.size);
  }, [documentStatuses, onSuggestionsApplied, resolveField, toFieldValue, isEmpty]);

  /** POSTs evaluation data to /extraction/evaluate then resets AI state. Call after save. */
  const submitEvaluations = async (): Promise<void> => {
    if (aiFields.size === 0) return;

    const payloadByRunId = buildAiRunEvaluations({
      suggestionsByField: aiFields,
      resolveSavedValue: field => String(getValuesRef.current(field as Path<TFieldValues>) ?? ''),
      isAutoFilledField: field => autoFilledFields.has(field),
      isModifiedField: field => modifiedFields.has(field)
    });

    const docIds = new Set<string>();

    await Promise.all(
      Array.from(payloadByRunId.entries()).map(([runId, payload]) => {
        const docId = documentIdByRunIdRef.current.get(runId);
        if (!docId) return Promise.resolve();
        docIds.add(docId);
        return extractionApi.submitExtractionEvaluation(client, docId, {
          finalFieldValues: payload.finalFieldValues,
          context: payload.context
        });
      })
    );

    // Invalidate so remount sees evaluation !== null and skips re-filling.
    for (const docId of docIds) {
      void queryClient.invalidateQueries({
        queryKey: documentProcessingKeys.byDocument(docId)
      });
    }

    setAiFields(new Map());
    setAutoFilledFields(new Set());
    setModifiedFields(new Set());
  };

  /** Clears AI badges without posting evaluations. Used on cancel. */
  const clearAiState = (): void => {
    // Persist processed IDs so cancel → reopen skips them.
    queryClient.setQueryData<string[]>(PROCESSED_RUNS_QC_KEY, [...processedRunIdsRef.current]);
    setAiFields(new Map());
    setAutoFilledFields(new Set());
    setModifiedFields(new Set());
  };

  const isProcessing = documentStatuses.some(
    s =>
      s?.processingStatus === DocumentProcessingStatus.PENDING ||
      s?.processingStatus === DocumentProcessingStatus.PROCESSING
  );

  return {
    aiFields,
    isProcessing,
    suggestionsCount: aiFields.size,
    /** Call when the user edits an AI-filled field so evaluations track it as modified. */
    markFieldModified: (field: string) => setModifiedFields(prev => new Set([...prev, field])),
    submitEvaluations,
    clearAiState
  };
}
