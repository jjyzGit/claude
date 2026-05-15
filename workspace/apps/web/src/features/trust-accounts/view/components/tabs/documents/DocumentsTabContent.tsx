import {getDocumentMaxFiles} from '@sollapay/domain';
import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {ContentSection, EmptyState, Illustration} from '@sollapay/ui/components';
import {SecureDocumentIllustration} from '@sollapay/ui/illustrations';
import {formatFileSize, toISO} from '@sollapay/utils';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {AddDocumentsButton, DocumentsTable, getDocumentTypeLabel} from '@/features/documents';
import {
  trustAccountActivityKeys,
  useTrustAccountDocumentsQuery
} from '@/features/trust-accounts/hooks';

import {DocumentsTabContentSkeleton} from './DocumentsTabContent.skeleton';

import type {TrustAccountTabContext} from '../../TrustAccountView';
import type {DocumentTableRow, DocumentUploadTab} from '@/features/documents';
import type {DocumentListItemDTO} from '@sollapay/types';
import type {FC} from 'react';

interface DocumentsTabContentProps {
  trustAccount: TrustAccountTabContext;
}

function mapDocumentDto(doc: DocumentListItemDTO): DocumentTableRow {
  const ext = doc.fileName.split('.').pop() ?? '';
  return {
    id: doc.id,
    fileName: doc.originalFileName ?? doc.fileName,
    fileExtension: ext,
    fileSize: formatFileSize(doc.fileSize),
    documentType: doc.documentType,
    uploadDate: toISO(doc.uploadedAt) || toISO(doc.createdAt),
    lastUpdated: toISO(doc.updatedAt),
    uploadedBy: {
      name: doc.uploadedByUser?.name ?? '',
      role: doc.uploadedByUser?.role ?? ''
    }
  };
}

export const DocumentsTabContent: FC<DocumentsTabContentProps> = ({
  trustAccount: {id: trustAccountId}
}) => {
  const queryClient = useQueryClient();
  const documentsQuery = useTrustAccountDocumentsQuery(trustAccountId);
  const {t} = useTranslation(['trustAccounts', 'common']);
  const {data, isLoading, refetch} = documentsQuery;
  const onRefetch = () => {
    void refetch();
    void queryClient.invalidateQueries({
      queryKey: trustAccountActivityKeys.tabCounts(trustAccountId)
    });
  };

  if (isLoading) {
    return <DocumentsTabContentSkeleton />;
  }

  const documentsEmptyState = (
    <EmptyState
      className="py-8"
      illustration={
        <Illustration width={64} height={64}>
          <SecureDocumentIllustration />
        </Illustration>
      }
      title={t('view.documents.emptyState.title')}
      subtitle={t('view.documents.emptyState.subtitle')}
    />
  );

  const trustDetailsTabs: DocumentUploadTab[] = [
    {
      value: 'companyRegistrationExtract',
      label: getDocumentTypeLabel(DocumentType.COMPANY_REGISTRATION_EXTRACT, t),
      documentType: DocumentType.COMPANY_REGISTRATION_EXTRACT,
      maxFiles: getDocumentMaxFiles(DocumentType.COMPANY_REGISTRATION_EXTRACT)
    },
    {
      value: 'incorporationCertificate',
      label: getDocumentTypeLabel(DocumentType.INCORPORATION_CERTIFICATE, t),
      documentType: DocumentType.INCORPORATION_CERTIFICATE,
      maxFiles: getDocumentMaxFiles(DocumentType.INCORPORATION_CERTIFICATE)
    },
    {
      value: 'authorizedSignatoriesProtocol',
      label: getDocumentTypeLabel(DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL, t),
      documentType: DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL,
      maxFiles: getDocumentMaxFiles(DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL)
    }
  ];

  const complianceTabs: DocumentUploadTab[] = [
    {
      value: 'landOwnershipVerification',
      label: getDocumentTypeLabel(DocumentType.LAND_OWNERSHIP_VERIFICATION, t),
      documentType: DocumentType.LAND_OWNERSHIP_VERIFICATION,
      required: true,
      maxFiles: getDocumentMaxFiles(DocumentType.LAND_OWNERSHIP_VERIFICATION)
    },
    {
      value: 'transactionLegalDocument',
      label: getDocumentTypeLabel(DocumentType.TRANSACTION_LEGAL_DOCUMENT, t),
      documentType: DocumentType.TRANSACTION_LEGAL_DOCUMENT,
      maxFiles: getDocumentMaxFiles(DocumentType.TRANSACTION_LEGAL_DOCUMENT)
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      <ContentSection
        title={t('view.documents.trustDetails.title')}
        subtitle={t('view.documents.trustDetails.subtitle')}
        isLoading={isLoading}
        action={
          <AddDocumentsButton
            title={t('view.documents.trustDetails.title')}
            tabs={trustDetailsTabs}
            entityType={DocumentEntityType.TRUST_ACCOUNT}
            entityId={trustAccountId}
            documentContext={DocumentContext.TRUST_DETAILS}
            onDocumentUploaded={onRefetch}
            onDocumentChange={onRefetch}
          />
        }
      >
        <DocumentsTable
          documents={(data?.trustDetails ?? []).map(mapDocumentDto)}
          entityType={DocumentEntityType.TRUST_ACCOUNT}
          entityId={trustAccountId}
          documentContext={DocumentContext.TRUST_DETAILS}
          emptyState={documentsEmptyState}
          onDeleted={onRefetch}
        />
      </ContentSection>

      <ContentSection
        title={t('view.documents.compliance.title')}
        subtitle={t('view.documents.compliance.subtitle')}
        isLoading={isLoading}
        action={
          <AddDocumentsButton
            title={t('view.documents.compliance.title')}
            tabs={complianceTabs}
            entityType={DocumentEntityType.TRUST_ACCOUNT}
            entityId={trustAccountId}
            documentContext={DocumentContext.COMPLIANCE}
            onDocumentUploaded={onRefetch}
            onDocumentChange={onRefetch}
          />
        }
      >
        <DocumentsTable
          documents={(data?.compliance ?? []).map(mapDocumentDto)}
          entityType={DocumentEntityType.TRUST_ACCOUNT}
          entityId={trustAccountId}
          documentContext={DocumentContext.COMPLIANCE}
          emptyState={documentsEmptyState}
          onDeleted={onRefetch}
        />
      </ContentSection>
    </div>
  );
};

export type {DocumentsTabContentProps};
