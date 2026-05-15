import {getDocumentMaxFiles} from '@sollapay/domain';
import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {FormSectionHeading} from '@sollapay/ui/components';
import {useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ErrorAlertMessage} from '@/components';
import {
  DocumentUploadSection,
  getDocumentTypeLabel,
  useDocumentRequiredForm
} from '@/features/documents';
import {trustAccountKeys} from '@/features/trust-accounts/hooks';

import type {FormStateSnapshot} from '@/hooks';
import type {FC} from 'react';

interface SupportingDocsStepFormProps {
  trustAccountId: string;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

export const SupportingDocsStepForm: FC<SupportingDocsStepFormProps> = ({
  trustAccountId,
  onFormStateChange
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const queryClient = useQueryClient();
  const [uploadError, setUploadError] = useState<unknown>(null);

  const handleDocumentChange = () => {
    void queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(trustAccountId)});
  };

  useDocumentRequiredForm({
    entityType: DocumentEntityType.TRUST_ACCOUNT,
    entityId: trustAccountId,
    documentContext: DocumentContext.COMPLIANCE,
    requiredDocumentType: DocumentType.LAND_OWNERSHIP_VERIFICATION,
    onFormStateChange
  });

  return (
    <div className="flex flex-col gap-6" data-slot="supporting-docs-step-form">
      {uploadError != null && <ErrorAlertMessage error={uploadError} />}
      <FormSectionHeading
        title={t('activation.packages.compliance.supportingDocuments.title')}
        description={t('activation.packages.compliance.supportingDocuments.description')}
      />
      <DocumentUploadSection
        title={getDocumentTypeLabel(DocumentType.LAND_OWNERSHIP_VERIFICATION, t)}
        description={t(
          'activation.packages.compliance.supportingDocuments.form.landOwnership.description'
        )}
        examples={
          t('activation.packages.compliance.supportingDocuments.form.landOwnership.examples', {
            returnObjects: true
          }) as string[]
        }
        required
        maxFiles={getDocumentMaxFiles(DocumentType.LAND_OWNERSHIP_VERIFICATION)}
        entityType={DocumentEntityType.TRUST_ACCOUNT}
        entityId={trustAccountId}
        documentContext={DocumentContext.COMPLIANCE}
        documentType={DocumentType.LAND_OWNERSHIP_VERIFICATION}
        onError={setUploadError}
        onDocumentChange={handleDocumentChange}
      />

      <DocumentUploadSection
        title={getDocumentTypeLabel(DocumentType.TRANSACTION_LEGAL_DOCUMENT, t)}
        description={t(
          'activation.packages.compliance.supportingDocuments.form.transactionLegal.description'
        )}
        examples={
          t('activation.packages.compliance.supportingDocuments.form.transactionLegal.examples', {
            returnObjects: true
          }) as string[]
        }
        maxFiles={getDocumentMaxFiles(DocumentType.TRANSACTION_LEGAL_DOCUMENT)}
        entityType={DocumentEntityType.TRUST_ACCOUNT}
        entityId={trustAccountId}
        documentContext={DocumentContext.COMPLIANCE}
        documentType={DocumentType.TRANSACTION_LEGAL_DOCUMENT}
        onError={setUploadError}
        onDocumentChange={handleDocumentChange}
      />
    </div>
  );
};
