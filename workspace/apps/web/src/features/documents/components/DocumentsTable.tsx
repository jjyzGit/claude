import {Avatar, Badge, FileIcon, Table, Typography, nodeColumn} from '@sollapay/ui';
import {formatDateLocalized} from '@sollapay/utils';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {getInitials} from '@/utils';

import {DocumentActionsBar} from './DocumentActionsBar';
import {getDocumentTypeLabel} from '../utils';

import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import type {FC, ReactNode} from 'react';

interface DocumentTableRow {
  id: string;
  fileName: string;
  fileExtension: string;
  fileSize: string;
  documentType: DocumentType;
  uploadDate: string;
  lastUpdated: string;
  uploadedBy?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

interface DocumentsTableProps {
  documents: DocumentTableRow[];
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  hiddenColumns?: string[];
  emptyState?: ReactNode;
  onDeleted?: () => void;
  onError?: (error: unknown) => void;
}

export const DocumentsTable: FC<DocumentsTableProps> = ({
  documents,
  entityType,
  entityId,
  documentContext,
  hiddenColumns,
  emptyState,
  onDeleted,
  onError
}) => {
  const {t, i18n} = useTranslation('common');
  const columns = useMemo(
    () => [
      nodeColumn<DocumentTableRow>({
        id: 'fileName',
        header: t('documentsTable.columns.fileName'),
        maxWidth: 200,

        accessorFn: row => row.fileName,
        cell: row => (
          <div className="flex items-center gap-3">
            <FileIcon ext={row.fileExtension.replace('.', '').toUpperCase()} size="md" />
            <Typography size="sm" weight="medium">
              {row.fileName}
            </Typography>
          </div>
        )
      }),
      nodeColumn<DocumentTableRow>({
        id: 'documentType',
        header: t('documentsTable.columns.documentType'),

        accessorFn: row => row.documentType,
        cell: row => (
          <Badge variant="gray" size="sm">
            {getDocumentTypeLabel(row.documentType, t)}
          </Badge>
        )
      }),
      nodeColumn<DocumentTableRow>({
        id: 'fileSize',
        header: t('documentsTable.columns.fileSize'),

        accessorFn: row => row.fileSize,
        cell: row => (
          <Typography size="sm" color="secondary">
            <span dir="ltr">{row.fileSize}</span>
          </Typography>
        )
      }),
      nodeColumn<DocumentTableRow>({
        id: 'lastUpdated',
        header: t('documentsTable.columns.lastUpdated'),

        accessorFn: row => row.lastUpdated,
        cell: row => (
          <span className="text-fg-secondary tabular-nums">
            {row.lastUpdated ? formatDateLocalized(row.lastUpdated, i18n.language) : '—'}
          </span>
        )
      }),
      nodeColumn<DocumentTableRow>({
        id: 'uploadDate',
        header: t('documentsTable.columns.uploadDate'),

        accessorFn: row => row.uploadDate,
        cell: row => (
          <span className="text-fg-secondary tabular-nums">
            {row.uploadDate ? formatDateLocalized(row.uploadDate, i18n.language) : '—'}
          </span>
        )
      }),
      ...(!hiddenColumns?.includes('uploadedBy')
        ? [
            nodeColumn<DocumentTableRow>({
              id: 'uploadedBy',
              header: t('documentsTable.columns.uploadedBy'),

              accessorFn: row => row.uploadedBy?.name ?? '',
              cell: row =>
                row.uploadedBy ? (
                  <div className="flex items-center justify-start gap-3">
                    <Avatar
                      initials={getInitials(row.uploadedBy.name)}
                      src={row.uploadedBy.avatarUrl}
                      noShadow
                    />
                    <div className="flex flex-col items-start gap-0.5 min-w-0">
                      <Typography size="sm" weight="medium">
                        {row.uploadedBy.name}
                      </Typography>
                      <Typography size="xs" color="tertiary">
                        {t(`roles.${row.uploadedBy.role}`)}
                      </Typography>
                    </div>
                  </div>
                ) : null
            })
          ]
        : []),
      nodeColumn<DocumentTableRow>({
        id: 'actions',
        header: '',
        width: 'min',
        enableSorting: false,
        cell: row => (
          <DocumentActionsBar
            documentId={row.id}
            entityType={entityType}
            entityId={entityId}
            documentContext={documentContext}
            onDeleted={onDeleted}
            onError={onError}
          />
        )
      })
    ],
    [t, i18n.language, entityType, entityId, documentContext, hiddenColumns, onDeleted, onError]
  );

  return (
    <Table
      columns={columns}
      data={documents}
      emptyState={emptyState}
      emptyStateText={t('documentsTable.emptyState')}
    />
  );
};

export type {DocumentTableRow, DocumentsTableProps};
