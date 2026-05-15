import {Tabs, TabsContent} from '@sollapay/ui/components';
import {useCallback, useEffect, useRef, useState} from 'react';

import {FileUploadManager} from './FileUploadManager';

import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import type {DocumentMetadata} from '@sollapay/types';
import type {IconName, TabItem} from '@sollapay/ui/components';
import type {ReactNode} from 'react';

const ICON_UPLOADED: IconName = 'check-circle-dashed';
const ICON_PENDING: IconName = 'upload';

export interface DocumentUploadTab {
  value: string;
  label: TabItem['label'];
  documentType: DocumentType;
  /** When true the tab requires at least one uploaded file */
  required?: boolean;
  /** Maximum number of files allowed for this document type */
  maxFiles?: number;
}

export interface DocumentUploadTabsProps {
  tabs: DocumentUploadTab[];
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  metadata?: DocumentMetadata;
  metadataFilter?: Record<string, string | undefined>;
  skipProcessing?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onDocumentChange?: () => void;
  onDocumentUploaded?: (documentId: string) => void;
  /** Called whenever the document list changes — receives all current document IDs. */
  onDocumentsLoaded?: (documentIds: string[]) => void;
  className?: string;
  children?: ReactNode;
}

export function DocumentUploadTabs({
  tabs,
  entityType,
  entityId,
  documentContext,
  metadata,
  metadataFilter,
  skipProcessing,
  value,
  defaultValue,
  onValueChange,
  onDocumentChange,
  onDocumentUploaded,
  onDocumentsLoaded,
  className,
  children
}: DocumentUploadTabsProps) {
  const [tabDocIds, setTabDocIds] = useState<Record<string, string[]>>({});

  const onDocumentsLoadedRef = useRef(onDocumentsLoaded);
  onDocumentsLoadedRef.current = onDocumentsLoaded;

  useEffect(() => {
    const allIds = Object.values(tabDocIds).flat();
    onDocumentsLoadedRef.current?.(allIds);
  }, [tabDocIds]);

  const handleTabDocumentsLoaded = useCallback((tabValue: string, documentIds: string[]) => {
    setTabDocIds(prev => {
      const existing = prev[tabValue];
      if (
        existing &&
        existing.length === documentIds.length &&
        existing.every((id, i) => id === documentIds[i])
      ) {
        return prev;
      }
      return {...prev, [tabValue]: documentIds};
    });
  }, []);

  const tabItems: TabItem[] = tabs.map(tab => {
    const hasUploaded = (tabDocIds[tab.value]?.length ?? 0) > 0;
    const label = tab.required ? (
      <>
        {tab.label}
        {' *'}
      </>
    ) : (
      tab.label
    );
    return {
      value: tab.value,
      label,
      icon: hasUploaded ? ICON_UPLOADED : ICON_PENDING
    };
  });

  return (
    <Tabs
      tabs={tabItems}
      variant="secondary"
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={onValueChange}
      className={className}
    >
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} keepMounted>
          <FileUploadManager
            entityType={entityType}
            entityId={entityId}
            documentContext={documentContext}
            documentType={tab.documentType}
            metadata={metadata}
            metadataFilter={metadataFilter}
            skipProcessing={skipProcessing}
            minFiles={tab.required ? 1 : undefined}
            maxFiles={tab.maxFiles}
            onDocumentChange={onDocumentChange}
            onDocumentUploaded={onDocumentUploaded}
            onDocumentsLoaded={ids => handleTabDocumentsLoaded(tab.value, ids)}
          />
        </TabsContent>
      ))}
      {children}
    </Tabs>
  );
}
