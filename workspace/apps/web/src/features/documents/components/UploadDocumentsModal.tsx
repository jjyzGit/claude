import {Modal} from '@sollapay/ui/components';

import {DocumentUploadTabs} from './DocumentUploadTabs';

import type {DocumentUploadTab} from './DocumentUploadTabs';
import type {DocumentContext, DocumentEntityType} from '@sollapay/enums';
import type {DocumentMetadata} from '@sollapay/types';

export interface UploadDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  tabs: DocumentUploadTab[];
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  defaultValue?: string;
  metadata?: DocumentMetadata;
  metadataFilter?: Record<string, string | undefined>;
  onDocumentChange?: () => void;
  onDocumentUploaded?: () => void;
}

export function UploadDocumentsModal({
  isOpen,
  onClose,
  title,
  subtitle,
  tabs,
  entityType,
  entityId,
  documentContext,
  defaultValue,
  metadata,
  metadataFilter,
  onDocumentChange,
  onDocumentUploaded
}: UploadDocumentsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      title={title}
      description={subtitle}
      size="lg"
    >
      <DocumentUploadTabs
        tabs={tabs}
        entityType={entityType}
        entityId={entityId}
        documentContext={documentContext}
        defaultValue={defaultValue}
        metadata={metadata}
        metadataFilter={metadataFilter}
        skipProcessing
        onDocumentChange={onDocumentChange}
        onDocumentUploaded={onDocumentUploaded}
        className="pt-4"
      />
    </Modal>
  );
}
