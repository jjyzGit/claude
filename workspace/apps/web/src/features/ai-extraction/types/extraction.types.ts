/**
 * A single AI suggestion for a form field, produced by an extraction run.
 */
export interface AiSuggestion {
  /** Raw extracted string value. */
  value: string;
  /** Confidence score in the range 0–1. */
  confidence: number;
  /** The canonical targetField path returned by the extraction API. */
  targetField: string;
  /** The extraction run this suggestion originated from. */
  runId: string;
}

/**
 * Per-run payload posted to the evaluation API after a form is saved.
 * One entry per run, grouping all fields whose suggestion came from that run.
 */
export interface AiRunEvaluationPayload {
  /** Final saved value for each targetField path belonging to this run. */
  finalFieldValues: Record<string, string>;
  context: {
    /** All targetField paths whose AI suggestion was visible in the UI. */
    injectedSuggestionTargets: string[];
    /** Field keys that were empty at time of injection and filled by AI. */
    autoFilledFields: string[];
    /** Field keys that were auto-filled by AI but subsequently edited by the user. */
    modifiedFields: string[];
  };
}
