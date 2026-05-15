import {DocumentContext, DocumentEntityType} from '@sollapay/enums';
import {useEffect, useMemo, useRef} from 'react';

import {useAiFormSession} from '@/features/ai-extraction';
import {
  getLatestDocument,
  useDocumentsProcessingStatuses,
  useDocumentsQuery
} from '@/features/documents';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {DocumentType} from '@sollapay/enums';
import type {FieldValues, UseFormGetValues, UseFormSetValue} from 'react-hook-form';

export type FormStateSnapshot = {
  isDirty: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isError: boolean;
  hasErrors: boolean;
  onSave: () => Promise<void>;
  onCancel: () => void;
};

export const INITIAL_FORM_STATE: FormStateSnapshot = {
  isDirty: false,
  isLoading: false,
  isSaving: false,
  isError: false,
  hasErrors: false,
  onSave: () => Promise.resolve(),
  onCancel: () => {}
};

export interface UseFormShellAiConfig<TFieldValues extends FieldValues = FieldValues> {
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  /** Define at module scope to keep the reference stable across renders. */
  documentTypes: DocumentType[];
  getValues: UseFormGetValues<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  resolveField?: (targetField: string) => string | null;
  toFieldValue?: (field: string, extractedValue: string) => string;
}

export interface UseFormShellParams<TFieldValues extends FieldValues = FieldValues> {
  isDirty: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isError: boolean;
  /** True when the save mutation failed. Used to suppress submitEvaluations on save failure. */
  isSaveError?: boolean;
  hasErrors?: boolean;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onFormStateChange?: (state: FormStateSnapshot) => void;
  ai?: UseFormShellAiConfig<TFieldValues>;
}

// Stable no-ops used when AI is not configured, avoiding new allocations per render.
const noopGetValues = (() => ({})) as UseFormGetValues<FieldValues>;
const noopSetValue = (() => {}) as UseFormSetValue<FieldValues>;

/**
 * Encapsulates AI extraction wiring and form-state sync.
 * Queries documents, polls processing status, manages AI session,
 * computes effectiveDirty, and syncs state to the parent via onFormStateChange.
 */
export function useFormShell<TFieldValues extends FieldValues = FieldValues>({
  isDirty,
  isLoading,
  isSaving,
  isError,
  isSaveError,
  hasErrors = false,
  onSave,
  onCancel,
  onFormStateChange,
  ai
}: UseFormShellParams<TFieldValues>): {
  aiFields: Map<string, AiSuggestion>;
  isProcessing: boolean;
  suggestionsCount: number;
  markFieldModified: (field: string) => void;
  handleCancelWithAI: () => void;
} {
  // ─── Document query + processing status polling ────────────────────────────
  // Always called (Rules of Hooks); disabled via enabled:false / empty array when ai is absent.

  const documentsQuery = useDocumentsQuery(
    ai?.entityType ?? DocumentEntityType.TRUST_ACCOUNT,
    ai?.entityId ?? '',
    ai?.documentContext ?? DocumentContext.TRUST_DETAILS
  );

  // String key prevents useMemo from thrashing when documentTypes reference changes.
  const documentTypesKey = (ai?.documentTypes ?? []).join(',');

  const documentIds = useMemo((): Array<string | undefined> => {
    if (!ai) return [];
    return ai.documentTypes.map(type => getLatestDocument(documentsQuery.data, type)?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsQuery.data, documentTypesKey]);

  const processingStatuses = useDocumentsProcessingStatuses(documentIds);

  // ─── AI session ────────────────────────────────────────────────────────────

  const {
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified,
    submitEvaluations,
    clearAiState
  } = useAiFormSession<TFieldValues>({
    documentStatuses: processingStatuses.map(r => r.data),
    getValues: (ai?.getValues ?? noopGetValues) as UseFormGetValues<TFieldValues>,
    setValue: (ai?.setValue ?? noopSetValue) as UseFormSetValue<TFieldValues>,
    resolveField: ai?.resolveField,
    toFieldValue: ai?.toFieldValue
  });

  // ─── Derived state ────────────────────────────────────────────────────────

  const effectiveDirty = isDirty || suggestionsCount > 0;

  // Latest-value refs keep handleCancelWithAI identity stable.
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;
  const clearAiStateRef = useRef(clearAiState);
  clearAiStateRef.current = clearAiState;

  const handleCancelWithAI = useMemo(
    () => () => {
      onCancelRef.current();
      clearAiStateRef.current();
    },
    []
  );

  // ─── Auto-evaluate on save success ────────────────────────────────────────
  // Call submitEvaluations when isSaving transitions true → false without a save error.

  const submitEvaluationsRef = useRef(submitEvaluations);
  submitEvaluationsRef.current = submitEvaluations;

  const prevIsSavingRef = useRef(false);
  useEffect(() => {
    if (prevIsSavingRef.current && !isSaving && !isSaveError) {
      void submitEvaluationsRef.current();
    }
    prevIsSavingRef.current = isSaving;
  }, [isSaving, isSaveError]);

  // ─── Form state sync ──────────────────────────────────────────────────────

  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  useEffect(() => {
    onFormStateChange?.({
      isDirty: effectiveDirty,
      isLoading,
      isSaving,
      isError,
      hasErrors,
      onSave: () => onSaveRef.current(),
      onCancel: handleCancelWithAI
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveDirty, isLoading, isSaving, isError, hasErrors]);

  return {
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified,
    handleCancelWithAI
  };
}
