import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';

import {useUpsertDeveloperMutation} from '@/features/trust-accounts/activation/hooks';
import {useFormShell} from '@/hooks';

import {flattenFieldErrors} from '../../../utils';
import {DeveloperDetailsFormSchema} from '../../../validation';
import {
  EMPTY_DEVELOPER_DETAILS_FORM_VALUES,
  toDeveloperDetailsFormValues,
  toTrustDeveloperDetailsDTO
} from '../utils';

import type {DeveloperDetailsFormValues} from '../utils';
import type {FormStateSnapshot} from '@/hooks';
import type {TrustDeveloperDetailsDTO} from '@sollapay/types';

/** Document types that feed the AI extraction session for developer details. */
const DEVELOPER_AI_DOCUMENT_TYPES = [
  DocumentType.COMPANY_REGISTRATION_EXTRACT,
  DocumentType.INCORPORATION_CERTIFICATE,
  DocumentType.AUTHORIZED_SIGNATORIES_PROTOCOL
] as const satisfies DocumentType[];

interface UseDeveloperDetailsFormParams {
  trustAccountId: string;
  developer: TrustDeveloperDetailsDTO | null | undefined;
  isLoading: boolean;
  isError: boolean;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

export const useDeveloperDetailsForm = ({
  trustAccountId,
  developer,
  isLoading,
  isError,
  onFormStateChange
}: UseDeveloperDetailsFormParams) => {
  const upsertDeveloperMutation = useUpsertDeveloperMutation(trustAccountId);

  const form = useForm<DeveloperDetailsFormValues>({
    defaultValues: EMPTY_DEVELOPER_DETAILS_FORM_VALUES
  });

  const developerDefaults = useMemo(() => toDeveloperDetailsFormValues(developer), [developer]);

  useEffect(() => {
    form.reset(developerDefaults, {keepDirtyValues: true});
  }, [developerDefaults, form]);

  const handleSave = form.handleSubmit(async values => {
    const result = await upsertDeveloperMutation.mutateAsync(toTrustDeveloperDetailsDTO(values));
    form.reset(toDeveloperDetailsFormValues(result.data.developer));
  });

  const handleCancel = () => {
    form.reset(developerDefaults);
    upsertDeveloperMutation.reset();
  };

  const allValues = useWatch({
    control: form.control,
    defaultValue: EMPTY_DEVELOPER_DETAILS_FORM_VALUES
  });
  const validationResult = DeveloperDetailsFormSchema.safeParse(allValues);
  const hasErrors = !validationResult.success;
  const fieldErrors = flattenFieldErrors(validationResult.success ? null : validationResult.error);

  const {aiFields, isProcessing, suggestionsCount, markFieldModified, handleCancelWithAI} =
    useFormShell<DeveloperDetailsFormValues>({
      isDirty: form.formState.isDirty,
      isLoading,
      isSaving: upsertDeveloperMutation.isPending,
      isError,
      isSaveError: upsertDeveloperMutation.isError,
      hasErrors,
      onSave: handleSave,
      onCancel: handleCancel,
      onFormStateChange,
      ai: {
        entityType: DocumentEntityType.TRUST_ACCOUNT,
        entityId: trustAccountId,
        documentContext: DocumentContext.TRUST_DETAILS,
        documentTypes: DEVELOPER_AI_DOCUMENT_TYPES,
        getValues: form.getValues,
        setValue: form.setValue
      }
    });

  return {
    form,
    handleSave,
    handleCancel: handleCancelWithAI,
    saveError: upsertDeveloperMutation.error,
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified,
    fieldErrors
  };
};
