import {getDocumentMaxFiles} from '@sollapay/domain';
import {
  DocumentContext,
  DocumentEntityType,
  DocumentType,
  DeveloperType,
  RelationshipType
} from '@sollapay/enums';
import {
  AiBadge,
  FieldDatePicker,
  FieldInput,
  FieldSelect,
  FormSectionHeading,
  Icon,
  Tip
} from '@sollapay/ui/components';
import {useQueryClient} from '@tanstack/react-query';
import {Controller, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {FormShell} from '@/components';
import {AiExtractionStatus} from '@/features/ai-extraction';
import {DocumentUploadTabs, getDocumentTypeLabel} from '@/features/documents';
import {useShowErrors} from '@/features/trust-accounts/activation/hooks';
import {trustAccountKeys} from '@/features/trust-accounts/hooks';

import {useDeveloperDetailsForm} from '../hooks';

import type {FormStateSnapshot} from '@/hooks';
import type {TrustDeveloperDetailsDTO} from '@sollapay/types';
import type {FC} from 'react';

interface DeveloperDetailsStepFormProps {
  trustAccountId: string;
  developer: TrustDeveloperDetailsDTO | null | undefined;
  isLoading: boolean;
  isError: boolean;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

type ExtractableField = 'fullName' | 'idNumber' | 'establishedDate' | 'address';

export const DeveloperDetailsStepForm: FC<DeveloperDetailsStepFormProps> = ({
  trustAccountId,
  developer,
  isLoading,
  isError,
  onFormStateChange
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const queryClient = useQueryClient();
  const showErrors = useShowErrors();

  const handleDocumentChange = () => {
    void queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(trustAccountId)});
  };

  const {
    form,
    handleSave,
    saveError,
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified,
    fieldErrors
  } = useDeveloperDetailsForm({trustAccountId, developer, isLoading, isError, onFormStateChange});

  const {control, register} = form;

  const fe = (key: string) => (showErrors && fieldErrors[key] ? t(fieldErrors[key]) : undefined);

  // ─── Derived state ────────────────────────────────────────────────────────

  const selectedDeveloperType = useWatch({control, name: 'developerType'});
  const isCorporation = selectedDeveloperType === DeveloperType.CORPORATION;

  // ─── Field labels (depend on developer type) ──────────────────────────────

  const fullNameLabel = isCorporation
    ? t('activation.packages.trustDetails.form.fields.fullNameCorporate')
    : t('activation.packages.trustDetails.form.fields.fullName');

  const fullNamePlaceholder = isCorporation
    ? t('activation.packages.trustDetails.form.fields.fullNameCorporatePlaceholder')
    : t('activation.packages.trustDetails.form.fields.fullNamePlaceholder');

  const idNumberLabel = isCorporation
    ? t('activation.packages.trustDetails.form.fields.idNumberCorporate')
    : t('activation.packages.trustDetails.form.fields.idNumberIndividual');

  const idNumberPlaceholder = isCorporation
    ? t('activation.packages.trustDetails.form.fields.idNumberCorporatePlaceholder')
    : t('activation.packages.trustDetails.form.fields.idNumberPlaceholder');

  const dateFieldLabel = isCorporation
    ? t('activation.packages.trustDetails.form.fields.establishedDate')
    : t('activation.packages.trustDetails.form.fields.dateOfBirth');

  // ─── Select options ───────────────────────────────────────────────────────

  const developerTypeOptions = [
    {
      value: DeveloperType.CORPORATION,
      label: t('activation.packages.trustDetails.form.options.developerTypes.corporation')
    },
    {
      value: DeveloperType.INDIVIDUAL,
      label: t('activation.packages.trustDetails.form.options.developerTypes.individual')
    }
  ];

  const relationshipTypeOptions = [
    {
      value: RelationshipType.FIRST_PROJECT,
      label: t('activation.packages.trustDetails.form.options.relationshipTypes.firstProject')
    },
    {
      value: RelationshipType.FEW_PROJECTS,
      label: t('activation.packages.trustDetails.form.options.relationshipTypes.fewProjects')
    },
    {
      value: RelationshipType.ONGOING_COLLAB,
      label: t('activation.packages.trustDetails.form.options.relationshipTypes.ongoingCollab')
    }
  ];

  const metFaceToFaceOptions = [
    {value: 'yes', label: t('activation.packages.trustDetails.form.options.metFaceToFace.yes')},
    {value: 'no', label: t('activation.packages.trustDetails.form.options.metFaceToFace.no')}
  ];

  // ─── AI badge helpers ─────────────────────────────────────────────────────

  const aiBadge = (field: ExtractableField) => (aiFields.has(field) ? <AiBadge /> : undefined);

  const onAiFieldChange = (field: ExtractableField) => {
    if (aiFields.has(field)) markFieldModified(field);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <FormShell
      id="developer-details-form"
      className="flex flex-col gap-6"
      onSubmit={handleSave}
      saveError={saveError}
    >
      {/* Developer Documents section */}
      <div className="flex flex-col gap-6">
        <FormSectionHeading
          title={t('activation.packages.trustDetails.developerDetails.sections.documents.title')}
          description={t(
            'activation.packages.trustDetails.developerDetails.sections.documents.description'
          )}
        />
        <Tip
          title={t('activation.packages.trustDetails.form.sections.developerDocuments.tip.title')}
          description={t(
            'activation.packages.trustDetails.form.sections.developerDocuments.tip.description'
          )}
        />
        <DocumentUploadTabs
          entityType={DocumentEntityType.TRUST_ACCOUNT}
          entityId={trustAccountId}
          documentContext={DocumentContext.TRUST_DETAILS}
          onDocumentChange={handleDocumentChange}
          tabs={[
            {
              value: 'extract',
              label: getDocumentTypeLabel(DocumentType.COMPANY_REGISTRATION_EXTRACT, t),
              documentType: DocumentType.COMPANY_REGISTRATION_EXTRACT,
              maxFiles: getDocumentMaxFiles(DocumentType.COMPANY_REGISTRATION_EXTRACT)
            },
            {
              value: 'certificate',
              label: getDocumentTypeLabel(DocumentType.INCORPORATION_CERTIFICATE, t),
              documentType: DocumentType.INCORPORATION_CERTIFICATE,
              maxFiles: getDocumentMaxFiles(DocumentType.INCORPORATION_CERTIFICATE)
            },
            {
              value: 'signatories',
              label: getDocumentTypeLabel(DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL, t),
              documentType: DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL,
              maxFiles: getDocumentMaxFiles(DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL)
            }
          ]}
        />
      </div>

      {/* Developer Details section */}
      <div className="flex flex-col gap-4">
        <FormSectionHeading
          title={t('activation.packages.trustDetails.developerDetails.sections.details.title')}
          description={t(
            'activation.packages.trustDetails.developerDetails.sections.details.description'
          )}
          trailing={
            <AiExtractionStatus isProcessing={isProcessing} suggestionsCount={suggestionsCount} />
          }
        />

        <div className="grid grid-cols-2 gap-6">
          <Controller
            name="developerType"
            control={control}
            render={({field}) => (
              <div className="col-span-2">
                <FieldSelect
                  label={`${t('activation.packages.trustDetails.form.fields.developerType')} *`}
                  placeholder={t(
                    'activation.packages.trustDetails.form.fields.developerTypePlaceholder'
                  )}
                  value={field.value as DeveloperType}
                  onValueChange={(value: string) => field.onChange(value as DeveloperType)}
                  options={developerTypeOptions}
                  error={fe('developerType')}
                />
              </div>
            )}
          />

          <Controller
            name="relationshipType"
            control={control}
            render={({field}) => (
              <div className="col-span-2">
                <FieldSelect
                  label={`${t('activation.packages.trustDetails.form.fields.relationshipType')} *`}
                  placeholder={t(
                    'activation.packages.trustDetails.form.fields.relationshipTypePlaceholder'
                  )}
                  value={field.value as RelationshipType}
                  onValueChange={(value: string) => field.onChange(value as RelationshipType)}
                  options={relationshipTypeOptions}
                  error={fe('relationshipType')}
                />
              </div>
            )}
          />

          <Controller
            name="metFaceToFace"
            control={control}
            render={({field}) => (
              <div className="col-span-2">
                <FieldSelect
                  label={`${t('activation.packages.trustDetails.form.fields.metFaceToFace')} *`}
                  placeholder={t(
                    'activation.packages.trustDetails.form.fields.metFaceToFacePlaceholder'
                  )}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={metFaceToFaceOptions}
                  error={fe('metFaceToFace')}
                />
              </div>
            )}
          />

          <FieldInput
            label={`${fullNameLabel} *`}
            placeholder={fullNamePlaceholder}
            startAdornment={<Icon name="mail" className="size-4" />}
            badge={aiBadge('fullName')}
            error={fe('fullName')}
            {...register('fullName', {
              onChange: () => onAiFieldChange('fullName')
            })}
          />

          <FieldInput
            label={`${idNumberLabel} *`}
            placeholder={idNumberPlaceholder}
            startAdornment={<Icon name="mail" className="size-4" />}
            badge={aiBadge('idNumber')}
            error={fe('idNumber')}
            {...register('idNumber', {
              onChange: () => onAiFieldChange('idNumber')
            })}
          />

          <Controller
            name="establishedDate"
            control={control}
            render={({field}) => (
              <FieldDatePicker
                label={`${dateFieldLabel} *`}
                placeholder={t('activation.packages.trustDetails.form.fields.datePlaceholder')}
                value={field.value}
                onChange={value => {
                  field.onChange(value);
                  onAiFieldChange('establishedDate');
                }}
                error={fe('establishedDate')}
                startAdornment={<Icon name="calendar" className="size-4" />}
                badge={aiBadge('establishedDate')}
              />
            )}
          />

          <FieldInput
            label={`${t('activation.packages.trustDetails.form.fields.address')} *`}
            placeholder={t('activation.packages.trustDetails.form.fields.addressPlaceholder')}
            startAdornment={<Icon name="mail" className="size-4" />}
            badge={aiBadge('address')}
            error={fe('address')}
            {...register('address', {
              onChange: () => onAiFieldChange('address')
            })}
          />
        </div>
      </div>
    </FormShell>
  );
};
