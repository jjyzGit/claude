import {getDocumentMaxFiles} from '@sollapay/domain';
import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {FormSectionHeading, Tip} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {DocumentUploadTabs, getDocumentTypeLabel} from '@/features/documents';

import type {FC} from 'react';

interface DocumentUploadSectionProps {
  trustAccountId: string;
  onDocumentsChange: (documentIds: string[]) => void;
}

export const DocumentUploadSection: FC<DocumentUploadSectionProps> = ({
  trustAccountId,
  onDocumentsChange
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);

  const tabs = [
    {
      value: 'signedContract',
      label: t('trustAccounts:view.buyers.addBuyerModal.documents.signedContract'),
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
  ];

  return (
    <div className="flex flex-col gap-4">
      <FormSectionHeading title={t('trustAccounts:view.buyers.addBuyerModal.documents.title')} />
      <Tip
        title={t('trustAccounts:view.buyers.addBuyerModal.documents.tip.title')}
        description={t('trustAccounts:view.buyers.addBuyerModal.documents.tip.description')}
      />
      <DocumentUploadTabs
        entityType={DocumentEntityType.TRUST_ACCOUNT}
        entityId={trustAccountId}
        documentContext={DocumentContext.PURCHASE_DOCUMENTS}
        metadataFilter={{purchaseId: undefined}}
        tabs={tabs}
        defaultValue="signedContract"
        onDocumentsLoaded={onDocumentsChange}
      />
    </div>
  );
};
