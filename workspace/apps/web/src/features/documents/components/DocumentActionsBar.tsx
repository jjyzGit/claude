import {FileActionsBar} from '@sollapay/ui/components';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  useDeleteDocumentMutation,
  useDownloadDocumentMutation,
  useViewDocumentMutation
} from '../hooks';
import {DeleteFileModal} from '../modals';
import {openDocumentPreview} from '../utils';

import type {DocumentContext, DocumentEntityType} from '@sollapay/enums';

export interface DocumentActionsBarProps {
  documentId: string;
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  onDeleted?: () => void;
  onError?: (error: unknown) => void;
}

export function DocumentActionsBar({
  documentId,
  entityType,
  entityId,
  documentContext,
  onDeleted,
  onError
}: DocumentActionsBarProps) {
  const {t} = useTranslation('common');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const downloadMutation = useDownloadDocumentMutation(entityType, entityId, documentContext);
  const viewMutation = useViewDocumentMutation(entityType, entityId, documentContext);
  const deleteMutation = useDeleteDocumentMutation(entityType, entityId, documentContext);

  const handleDownload = useCallback(async () => {
    try {
      const url = await downloadMutation.mutateAsync(documentId);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      onError?.(err);
    }
  }, [downloadMutation, documentId, onError]);

  const handlePreview = useCallback(async () => {
    try {
      const url = await viewMutation.mutateAsync(documentId);
      await openDocumentPreview(url);
    } catch (err) {
      onError?.(err);
    }
  }, [viewMutation, documentId, onError]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync(documentId);
      setIsConfirmingDelete(false);
      onDeleted?.();
    } catch (err) {
      onError?.(err);
    }
  }, [deleteMutation, documentId, onDeleted, onError]);

  return (
    <>
      <FileActionsBar
        onPreview={handlePreview}
        onDownload={handleDownload}
        onDelete={onDeleted ? () => setIsConfirmingDelete(true) : undefined}
        previewLabel={t('documentsTable.actions.preview')}
        downloadLabel={t('documentsTable.actions.download')}
        deleteLabel={t('documentsTable.actions.delete')}
        isPreviewing={viewMutation.isPending}
        isDownloading={downloadMutation.isPending}
      />
      {onDeleted && (
        <DeleteFileModal
          isOpen={isConfirmingDelete}
          onConfirm={() => void handleDeleteConfirm()}
          onClose={() => setIsConfirmingDelete(false)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </>
  );
}
