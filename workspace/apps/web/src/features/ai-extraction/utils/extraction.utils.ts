import type {AiRunEvaluationPayload, AiSuggestion} from '../types';

/**
 * Returns true when a form field value is considered "empty" from the AI perspective.
 * Null, undefined, and blank strings are all treated as empty.
 */
export function isEmptyAiValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  return false;
}

/**
 * Builds one evaluation payload per extraction run from the current AI session state.
 * The resulting map is keyed by runId and is ready to POST to the evaluation API.
 */
export function buildAiRunEvaluations(params: {
  suggestionsByField: Map<string, AiSuggestion>;
  resolveSavedValue: (field: string) => string;
  isAutoFilledField: (field: string) => boolean;
  isModifiedField: (field: string) => boolean;
}): Map<string, AiRunEvaluationPayload> {
  const rawByRunId = new Map<
    string,
    {
      finalFieldValues: Record<string, string>;
      context: {
        injectedSuggestionTargets: Set<string>;
        autoFilledFields: Set<string>;
        modifiedFields: Set<string>;
      };
    }
  >();

  for (const [fieldKey, suggestion] of params.suggestionsByField.entries()) {
    const entry = rawByRunId.get(suggestion.runId) ?? {
      finalFieldValues: {},
      context: {
        injectedSuggestionTargets: new Set<string>(),
        autoFilledFields: new Set<string>(),
        modifiedFields: new Set<string>()
      }
    };

    entry.finalFieldValues[suggestion.targetField] = params.resolveSavedValue(fieldKey);
    entry.context.injectedSuggestionTargets.add(suggestion.targetField);
    if (params.isAutoFilledField(fieldKey)) entry.context.autoFilledFields.add(fieldKey);
    if (params.isModifiedField(fieldKey)) entry.context.modifiedFields.add(fieldKey);
    rawByRunId.set(suggestion.runId, entry);
  }

  return new Map(
    Array.from(rawByRunId.entries()).map(([runId, entry]) => [
      runId,
      {
        finalFieldValues: entry.finalFieldValues,
        context: {
          injectedSuggestionTargets: [...entry.context.injectedSuggestionTargets],
          autoFilledFields: [...entry.context.autoFilledFields],
          modifiedFields: [...entry.context.modifiedFields]
        }
      }
    ])
  );
}
