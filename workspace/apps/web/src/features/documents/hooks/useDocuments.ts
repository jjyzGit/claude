import {DocumentProcessingStatus} from '@sollapay/enums';
import {useMutation, useQueries, useQuery, useQueryClient} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {documentsApi} from '../api';

import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import type {HttpClient} from '@sollapay/http-client';
import type {
  CompleteDocumentUploadPayload,
  DocumentDto,
  DocumentMetadata,
  DocumentProcessingStatusDto,
  PresignDocumentDto,
  PresignDocumentPayload
} from '@sollapay/types';

// ─── Query Keys ────────────────────────────────────────────────────────────────

export const documentKeys = {
  all: (entityType: DocumentEntityType, entityId: string) =>
    ['documents', entityType, entityId] as const,
  lists: (entityType: DocumentEntityType, entityId: string) =>
    [...documentKeys.all(entityType, entityId), 'list'] as const,
  list: (entityType: DocumentEntityType, entityId: string, documentContext: DocumentContext) =>
    [...documentKeys.lists(entityType, entityId), documentContext] as const
};

export const documentProcessingKeys = {
  all: ['document-processing'] as const,
  byDocument: (documentId: string) => [...documentProcessingKeys.all, documentId] as const
};

// ─── Document CRUD Hooks ────────────────────────────────────────────────────────

type DocumentListData = {documents: DocumentDto[]};

export function useDocumentsQuery(
  entityType: DocumentEntityType,
  entityId: string,
  documentContext: DocumentContext
) {
  const client = useApiClient();

  return useQuery({
    queryKey: documentKeys.list(entityType, entityId, documentContext),
    queryFn: () =>
      documentsApi
        .list<DocumentListData>(client, entityType, entityId, documentContext)
        .then(res => res.data.documents),
    enabled: !!entityId
  });
}

type DocumentDownloadData = {download: {url: string}};

export function useDownloadDocumentMutation(
  entityType: DocumentEntityType,
  entityId: string,
  documentContext: DocumentContext
) {
  const client = useApiClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await documentsApi.download<DocumentDownloadData>(
        client,
        entityType,
        entityId,
        documentContext,
        documentId
      );
      return res.data.download.url;
    }
  });
}

export function useViewDocumentMutation(
  entityType: DocumentEntityType,
  entityId: string,
  documentContext: DocumentContext
) {
  const client = useApiClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await documentsApi.download<DocumentDownloadData>(
        client,
        entityType,
        entityId,
        documentContext,
        documentId,
        true // inline
      );
      return res.data.download.url;
    }
  });
}

type PresignData = {document: PresignDocumentDto};

export function useUploadDocumentMutation(
  entityType: DocumentEntityType,
  entityId: string,
  documentContext: DocumentContext
) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      documentType,
      metadata,
      skipProcessing,
      onProgress
    }: {
      file: File;
      documentType: DocumentType;
      metadata?: DocumentMetadata;
      skipProcessing?: boolean;
      onProgress?: (percent: number) => void;
    }) => {
      const presignRes = await documentsApi.presign<PresignData>(
        client,
        entityType,
        entityId,
        documentContext,
        {
          documentType,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          metadata
        }
      );

      await documentsApi.uploadToS3(presignRes.data.document.uploadUrl, file, onProgress);

      await documentsApi.complete(client, entityType, entityId, documentContext, {
        documentId: presignRes.data.document.documentId,
        skipProcessing
      });

      return presignRes.data.document.documentId;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: documentKeys.list(entityType, entityId, documentContext)
      });
    }
  });
}

export function useDeleteDocumentMutation(
  entityType: DocumentEntityType,
  entityId: string,
  documentContext: DocumentContext
) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      documentsApi.delete(client, entityType, entityId, documentContext, documentId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: documentKeys.list(entityType, entityId, documentContext)
      });
    }
  });
}

// ─── Processing Status Hooks ────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 3_000;

const ACTIVE_STATUSES: DocumentProcessingStatus[] = [
  DocumentProcessingStatus.PENDING,
  DocumentProcessingStatus.PROCESSING
];

/** Polls processing status for multiple documents. Pass undefined to skip individual entries. */
export function useDocumentsProcessingStatuses(documentIds: Array<string | undefined>) {
  const client = useApiClient();

  return useQueries({
    queries: documentIds.map((id, index) => ({
      queryKey: documentProcessingKeys.byDocument(id ?? `__disabled_${index}`),
      queryFn: async (): Promise<DocumentProcessingStatusDto> => {
        const res = await documentsApi.getProcessingStatus(client, id as string);
        return res.data;
      },
      enabled: !!id,
      refetchInterval: (query: {state: {data?: DocumentProcessingStatusDto}}) => {
        const status = query.state.data?.processingStatus;
        return status !== undefined && ACTIVE_STATUSES.includes(status as DocumentProcessingStatus)
          ? POLL_INTERVAL_MS
          : false;
      },
      placeholderData: (prev: DocumentProcessingStatusDto | undefined) => prev
    }))
  });
}

// ─── Factory ────────────────────────────────────────────────────────────────────

type PresignResponse = {
  document: {
    documentId: string;
    uploadUrl: string;
  };
};

/**
 * Generic document upload hook factory.
 * Inject context-specific presign/complete/uploadToS3 functions to create a typed upload mutation.
 */
export const createDocumentUploadHook = <
  TPresignResponse extends PresignResponse,
  TCompleteResponse
>(
  presignFn: (
    client: HttpClient,
    entityId: string,
    payload: PresignDocumentPayload & {documentType: DocumentType}
  ) => Promise<{data: TPresignResponse}>,
  completeFn: (
    client: HttpClient,
    entityId: string,
    payload: CompleteDocumentUploadPayload
  ) => Promise<{data: TCompleteResponse}>,
  uploadToS3Fn: (url: string, file: File) => Promise<void>
) => {
  return (client: HttpClient, entityId: string) => {
    return useMutation({
      mutationFn: async ({
        file,
        documentType,
        metadata
      }: {
        file: File;
        documentType: DocumentType;
        metadata?: PresignDocumentPayload['metadata'];
      }) => {
        const presignResponse = await presignFn(client, entityId, {
          documentType,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          ...(metadata && {metadata})
        });

        await uploadToS3Fn(presignResponse.data.document.uploadUrl, file);

        return completeFn(client, entityId, {
          documentId: presignResponse.data.document.documentId
        });
      }
    });
  };
};
