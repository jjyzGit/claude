import type {HttpClient} from '@sollapay/http-client';
import type {ApiResponse, ExtractionRunClientContext, ExtractionRunDto} from '@sollapay/types';

export interface SubmitExtractionEvaluationBody {
  finalFieldValues: Record<string, string>;
  context: ExtractionRunClientContext;
}

export const extractionApi = {
  /** POST /documents/:documentId/extraction/evaluate. Submit evaluation feedback after save. */
  submitExtractionEvaluation: async (
    client: HttpClient,
    documentId: string,
    body: SubmitExtractionEvaluationBody
  ): Promise<ApiResponse<ExtractionRunDto>> => {
    return client.post<ApiResponse<ExtractionRunDto>, SubmitExtractionEvaluationBody>(
      `/documents/${documentId}/extraction/evaluate`,
      body
    );
  }
};
