import {getDocumentMaxFiles} from '@sollapay/domain';
import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {ContentSection, EmptyState, Illustration} from '@sollapay/ui/components';
import {SecureDocumentIllustration} from '@sollapay/ui/illustrations';
import {formatFileSize, toISO} from '@sollapay/utils';
import {useQueryClient} from '@tanstack/react-query';
import {memo, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {buyerKeys} from '@/features/buyers/hooks/useBuyersQuery';
import {AddDocumentsButton, DocumentsTable, getDocumentTypeLabel} from '@/features/documents';

import type {DocumentTableRow} from '@/features/documents';
import type {DocumentListItemRawDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface PurchaseDocumentsSectionProps {
  documents: DocumentListItemRawDTO[];
  trustAccountId: string;
  buyerId: string;
  purchaseId: string;
}

function mapToRow(doc: DocumentListItemRawDTO): DocumentTableRow {
  return {
    id: doc.id,
    fileName: doc.originalFileName ?? doc.fileName,
    fileExtension: doc.fileName.split('.').pop() ?? '',
    fileSize: formatFileSize(doc.fileSize),
    documentType: doc.documentType,
    uploadDate: toISO(doc.uploadedAt) || toISO(doc.createdAt),
    lastUpdated: toISO(doc.updatedAt)
  };
}

export const PurchaseDocumentsSection: FC<PurchaseDocumentsSectionProps> = memo(
  function PurchaseDocumentsSection({documents, trustAccountId, buyerId, purchaseId}) {
    const {t} = useTranslation(['trustAccounts', 'common']);
    const queryClient = useQueryClient();

    const refreshBuyer = useCallback(() => {
      void queryClient.refetchQueries({
        queryKey: buyerKeys.detail(trustAccountId, buyerId),
        exact: true
      });
    }, [queryClient, trustAccountId, buyerId]);

    const rows = useMemo(() => documents.map(mapToRow), [documents]);

    const uploadTabs = useMemo(
      () => [
        {
          value: 'signedContract',
          label: getDocumentTypeLabel(DocumentType.SIGNED_SALE_AGREEMENT, t),
          documentType: DocumentType.SIGNED_SALE_AGREEMENT,
          required: true,
          maxFiles: getDocumentMaxFiles(DocumentType.SIGNED_SALE_AGREEMENT)
        },
        {
          value: 'registrationForm',
          label: getDocumentTypeLabel(DocumentType.BUYER_REGISTRATION_FORM, t),
          documentType: DocumentType.BUYER_REGISTRATION_FORM,
          maxFiles: getDocumentMaxFiles(DocumentType.BUYER_REGISTRATION_FORM)
        }
      ],
      [t]
    );

    return (
      <ContentSection
        title={t('trustAccounts:view.purchases.documents')}
        action={
          <AddDocumentsButton
            title={t('common:addDocuments')}
            entityType={DocumentEntityType.TRUST_ACCOUNT}
            entityId={trustAccountId}
            documentContext={DocumentContext.PURCHASE_DOCUMENTS}
            tabs={uploadTabs}
            defaultValue="signedContract"
            metadata={{purchaseId}}
            onDocumentUploaded={refreshBuyer}
            onDocumentChange={refreshBuyer}
          />
        }
      >
        <DocumentsTable
          documents={rows}
          entityType={DocumentEntityType.TRUST_ACCOUNT}
          entityId={trustAccountId}
          documentContext={DocumentContext.PURCHASE_DOCUMENTS}
          hiddenColumns={['uploadedBy']}
          emptyState={
            <EmptyState
              className="py-8"
              illustration={
                <Illustration width={64} height={64}>
                  <SecureDocumentIllustration />
                </Illustration>
              }
              title={t('trustAccounts:view.purchases.emptyDocuments.title')}
              subtitle={t('trustAccounts:view.purchases.emptyDocuments.description')}
            />
          }
          onDeleted={refreshBuyer}
        />
      </ContentSection>
    );
  }
);
