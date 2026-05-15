import {cn} from '@sollapay/ui';
import {Badge, EmptyState, FileIcon, Illustration, Typography} from '@sollapay/ui/components';
import {SecureDocumentIllustration} from '@sollapay/ui/illustrations';
import {formatDateLocalized, formatFileSize} from '@sollapay/utils';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {DocumentActionsBar} from './DocumentActionsBar';
import {getDocumentTypeLabel} from '../utils';

import type {DocumentContext, DocumentEntityType} from '@sollapay/enums';
import type {DocumentListItemRawDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface DocumentsListProps {
  documents: DocumentListItemRawDTO[];
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  onDeleted?: () => void;
  emptyStateTitle: string;
  emptyStateSubtitle?: string;
}

interface DocumentRowProps {
  document: DocumentListItemRawDTO;
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  onDeleted?: () => void;
}

const DocumentRow = memo<DocumentRowProps>(function DocumentRow({
  document,
  entityType,
  entityId,
  documentContext,
  onDeleted
}) {
  const {t, i18n} = useTranslation('common');

  const size = formatFileSize(document.fileSize);
  const uploadDate = document.uploadedAt
    ? formatDateLocalized(document.uploadedAt.toString(), i18n.language)
    : '';
  const ext = document.fileName.split('.').pop()?.toUpperCase() ?? 'FILE';

  return (
    <div className="flex items-center justify-between border-t border-border-subtle px-4 py-4 first:border-t-0">
      <div className="flex min-w-0 items-center gap-3">
        <FileIcon ext={ext} size="md" />
        <div className="flex min-w-0 flex-col items-start gap-0.5">
          <Typography size="sm" className="max-w-64">
            {document.originalFileName}
          </Typography>
          <div className="flex items-center gap-1.5">
            <Typography size="xs" color="tertiary">
              <span dir="ltr">{size}</span>
              {uploadDate && <> • {uploadDate}</>}
            </Typography>
            <Badge variant="gray" size="sm">
              {getDocumentTypeLabel(document.documentType, t)}
            </Badge>
          </div>
        </div>
      </div>

      <DocumentActionsBar
        documentId={document.id}
        entityType={entityType}
        entityId={entityId}
        documentContext={documentContext}
        onDeleted={onDeleted}
      />
    </div>
  );
});

export const DocumentsList: FC<DocumentsListProps> = ({
  documents,
  entityType,
  entityId,
  documentContext,
  onDeleted,
  emptyStateTitle,
  emptyStateSubtitle
}) => (
  <div
    className={cn(
      'overflow-hidden rounded-xl border border-border-subtle shadow-xs',
      documents.length === 0 && 'min-h-52'
    )}
  >
    {documents.map(doc => (
      <DocumentRow
        key={doc.id}
        document={doc}
        entityType={entityType}
        entityId={entityId}
        documentContext={documentContext}
        onDeleted={onDeleted}
      />
    ))}
    {documents.length === 0 && (
      <EmptyState
        className="py-8"
        illustration={
          <Illustration width={64} height={64}>
            <SecureDocumentIllustration />
          </Illustration>
        }
        title={emptyStateTitle}
        subtitle={emptyStateSubtitle}
      />
    )}
  </div>
);
