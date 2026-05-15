import type {DocumentType, DocumentEntityType, DocumentContext} from '@sollapay/enums';
import type {HttpClient} from '@sollapay/http-client';
import type {
  ApiResponse,
  CompleteDocumentUploadPayload,
  DeleteDocumentPayload,
  DocumentProcessingStatusDto,
  PresignDocumentPayload
} from '@sollapay/types';

export const documentsApi = {
  presign: async <TResponse>(
    client: HttpClient,
    entityType: DocumentEntityType,
    entityId: string,
    documentContext: DocumentContext,
    payload: PresignDocumentPayload & {documentType: DocumentType}
  ): Promise<ApiResponse<TResponse>> => {
    return client.post<
      ApiResponse<TResponse>,
      PresignDocumentPayload & {documentType: DocumentType}
    >(`/documents/${entityType}/${entityId}/presign?documentContext=${documentContext}`, payload);
  },

  uploadToS3: (
    presignedUrl: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (onProgress) {
        xhr.upload.addEventListener('progress', e => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
        });
      }
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`S3 upload failed: ${xhr.statusText}`));
      });
      xhr.addEventListener('error', () => reject(new Error('S3 upload failed')));
      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  },

  complete: async <TResponse>(
    client: HttpClient,
    entityType: DocumentEntityType,
    entityId: string,
    documentContext: DocumentContext,
    payload: CompleteDocumentUploadPayload
  ): Promise<ApiResponse<TResponse>> => {
    return client.post<ApiResponse<TResponse>, CompleteDocumentUploadPayload>(
      `/documents/${entityType}/${entityId}/complete?documentContext=${documentContext}`,
      payload
    );
  },

  list: async <TResponse>(
    client: HttpClient,
    entityType: DocumentEntityType,
    entityId: string,
    documentContext: DocumentContext
  ): Promise<ApiResponse<TResponse>> => {
    return client.get<ApiResponse<TResponse>>(
      `/documents/${entityType}/${entityId}?documentContext=${documentContext}`
    );
  },

  download: async <TResponse>(
    client: HttpClient,
    entityType: DocumentEntityType,
    entityId: string,
    documentContext: DocumentContext,
    documentId: string,
    inline = false
  ): Promise<ApiResponse<TResponse>> => {
    const params = new URLSearchParams({
      documentContext,
      inline: inline.toString()
    });
    return client.get<ApiResponse<TResponse>>(
      `/documents/${entityType}/${entityId}/${documentId}/download?${params}`
    );
  },

  delete: async <TResponse>(
    client: HttpClient,
    entityType: DocumentEntityType,
    entityId: string,
    documentContext: DocumentContext,
    documentId: string,
    payload?: DeleteDocumentPayload
  ): Promise<ApiResponse<TResponse>> => {
    const params = new URLSearchParams({
      documentContext,
      ...(payload?.reason && {reason: payload.reason})
    });
    return client.delete<ApiResponse<TResponse>>(
      `/documents/${entityType}/${entityId}/${documentId}?${params}`
    );
  },

  getProcessingStatus: async (
    client: HttpClient,
    documentId: string
  ): Promise<ApiResponse<DocumentProcessingStatusDto>> => {
    return client.get<ApiResponse<DocumentProcessingStatusDto>>(
      `/documents/${documentId}/processing/status`
    );
  }
};
