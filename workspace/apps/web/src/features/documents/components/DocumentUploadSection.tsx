import {Badge, Typography} from '@sollapay/ui/components';
import {cn} from '@sollapay/ui/lib';
import {useTranslation} from 'react-i18next';

import {FileUploadManager} from './FileUploadManager';

import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import type {FC} from 'react';

export interface DocumentUploadSectionProps {
  title: string;
  description: string;
  examples?: string[];
  required?: boolean;
  maxFiles?: number;
  className?: string;
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  documentType: DocumentType;
  onError?: (error: unknown) => void;
  onDocumentChange?: () => void;
}

export const DocumentUploadSection: FC<DocumentUploadSectionProps> = ({
  title,
  description,
  examples,
  required,
  maxFiles,
  className,
  entityType,
  entityId,
  documentContext,
  documentType,
  onError,
  onDocumentChange
}) => {
  const {t} = useTranslation('common');

  return (
    <div
      className={cn('flex flex-col gap-4 rounded-md border border-border-subtle p-4', className)}
      data-slot="document-upload-section"
    >
      <div className="flex flex-col gap-0.5">
        <Typography size="sm" weight="semibold">
          {required ? `${title} *` : title}
        </Typography>
        <Typography size="xs" color="secondary">
          {description}
        </Typography>
        {examples != null && examples.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <Typography size="xs" color="tertiary" weight="semibold">
              {t('examplesLabel')}
            </Typography>
            {examples.map(example => (
              <Badge key={example} size="xs" variant="gray">
                {example}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <FileUploadManager
        entityType={entityType}
        entityId={entityId}
        documentContext={documentContext}
        documentType={documentType}
        minFiles={required ? 1 : undefined}
        maxFiles={maxFiles}
        onError={onError}
        onDocumentChange={onDocumentChange}
      />
    </div>
  );
};
