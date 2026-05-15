import {FileUpload} from '@sollapay/ui/components';
import {formatDateTime} from '@sollapay/utils';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  useDeleteDocumentMutation,
  useDocumentsQuery,
  useDownloadDocumentMutation,
  useUploadDocumentMutation,
  useViewDocumentMutation
} from '../hooks';
import {DeleteFileModal} from '../modals';
import {openDocumentPreview} from '../utils';

import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import type {DocumentDto, DocumentMetadata} from '@sollapay/types';

export interface FileUploadManagerProps {
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  documentType: DocumentType;
  metadata?: DocumentMetadata;
  metadataFilter?: Record<string, string | undefined>;
  skipProcessing?: boolean;
  minFiles?: number;
  maxFiles?: number;
  onError?: (error: unknown) => void;
  onDocumentChange?: () => void;
  onDocumentUploaded?: (documentId: string) => void;
  onDocumentsLoaded?: (documentIds: string[]) => void;
}

function formatUploadedAt(
  date: string | Date | null | undefined,
  justNowLabel: string,
  uploadedAtPrefix: string
): string | undefined {
  if (date == null) return undefined;
  const d = new Date(date as string | Date);
  if (isNaN(d.getTime())) return undefined;
  const diffMs = Date.now() - d.getTime();
  if (diffMs < 60_000) return justNowLabel;
  return `${uploadedAtPrefix} \u200E${formatDateTime(d)}`;
}

function toUploadedFile(doc: DocumentDto, uploadedNowLabel: string, uploadedAtLabel: string) {
  return {
    id: doc.id,
    fileName: doc.originalFileName ?? doc.fileName,
    fileSize: doc.fileSize,
    uploadedAt: formatUploadedAt(doc.uploadedAt ?? doc.createdAt, uploadedNowLabel, uploadedAtLabel)
  };
}

export function FileUploadManager({
  entityType,
  entityId,
  documentContext,
  documentType,
  metadata,
  metadataFilter,
  skipProcessing,
  minFiles,
  maxFiles,
  onError,
  onDocumentChange,
  onDocumentUploaded,
  onDocumentsLoaded
}: FileUploadManagerProps) {
  const {t} = useTranslation();
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const uploadedNowLabel = t('documents.uploadedNow');
  const uploadedAtLabel = t('documents.uploadedAt');

  const {data: allDocuments = []} = useDocumentsQuery(entityType, entityId, documentContext);
  const documents = allDocuments.filter(doc => {
    if (doc.documentType !== documentType) return false;
    if (!metadataFilter) return true;
    const docMeta = (doc.metadata as Record<string, unknown> | null) ?? {};
    return Object.entries(metadataFilter).every(([key, value]) =>
      value === undefined ? docMeta[key] === undefined : docMeta[key] === value
    );
  });
  const onDocumentsLoadedRef = useRef(onDocumentsLoaded);
  onDocumentsLoadedRef.current = onDocumentsLoaded;

  const ids = useMemo(() => documents.map(doc => doc.id), [documents]);
  const idsKey = ids.join(',');
  useEffect(() => {
    onDocumentsLoadedRef.current?.(ids);
  }, [idsKey]);

  const uploadMutation = useUploadDocumentMutation(entityType, entityId, documentContext);
  const deleteMutation = useDeleteDocumentMutation(entityType, entityId, documentContext);
  const downloadMutation = useDownloadDocumentMutation(entityType, entityId, documentContext);
  const viewMutation = useViewDocumentMutation(entityType, entityId, documentContext);

  const handleUpload = async (file: File) => {
    setUploadProgress(0);
    try {
      const documentId = await uploadMutation.mutateAsync({
        file,
        documentType,
        metadata,
        skipProcessing,
        onProgress: setUploadProgress
      });
      onDocumentChange?.();
      if (documentId) onDocumentUploaded?.(documentId);
    } catch (error) {
      onError?.(error);
    } finally {
      setUploadProgress(undefined);
    }
  };

  const handleDelete = (fileId: string) => {
    setDeletingFileId(fileId);
    return Promise.resolve();
  };

  const handleConfirmDelete = async () => {
    if (deletingFileId == null) return;
    try {
      await deleteMutation.mutateAsync(deletingFileId);
      setDeletingFileId(null);
      onDocumentChange?.();
    } catch (error) {
      onError?.(error);
      setDeletingFileId(null);
    }
  };

  const handleDownload = async (fileId: string) => {
    return downloadMutation.mutateAsync(fileId);
  };

  const handleView = async (fileId: string) => {
    const url = await viewMutation.mutateAsync(fileId);
    await openDocumentPreview(url);
  };

  return (
    <>
      <FileUpload
        documents={documents.map(doc => toUploadedFile(doc, uploadedNowLabel, uploadedAtLabel))}
        minFiles={minFiles}
        maxFiles={maxFiles}
        isUploading={uploadMutation.isPending}
        progress={uploadProgress}
        clickLabel={
          maxFiles === 1 ? t('documents.clickToUploadFile') : t('documents.clickToUploadFiles')
        }
        dragLabel={t('documents.dragAndDrop')}
        maxSizeLabel={t('documents.maxSize')}
        uploadingLabel={t('documents.uploading')}
        deleteLabel={t('documents.delete')}
        downloadLabel={t('documents.download')}
        viewLabel={t('documents.view')}
        onUpload={handleUpload}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onView={handleView}
      />

      <DeleteFileModal
        isOpen={deletingFileId !== null}
        onConfirm={() => void handleConfirmDelete()}
        onClose={() => setDeletingFileId(null)}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
