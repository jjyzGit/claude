import {useEffect, useMemo, useRef} from 'react';
import {useForm, useWatch} from 'react-hook-form';

import {useUpsertScopeMutation} from '@/features/trust-accounts/activation/hooks';

import {flattenFieldErrors} from '../../../utils';
import {TrustScopeFormSchema} from '../../../validation';
import {
  EMPTY_TRUST_SCOPE_FORM_VALUES,
  toTrustScopeDetailsDTO,
  toTrustScopeFormValues
} from '../utils';

import type {TrustScopeFormValues} from '../utils';
import type {FormStateSnapshot} from '@/hooks';
import type {TrustScopeDetailsDTO} from '@sollapay/types';

interface UseTrustScopeFormParams {
  trustAccountId: string;
  scope: TrustScopeDetailsDTO | null | undefined;
  isLoading: boolean;
  isError: boolean;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

export const useTrustScopeForm = ({
  trustAccountId,
  scope,
  isLoading,
  isError,
  onFormStateChange
}: UseTrustScopeFormParams) => {
  const upsertScopeMutation = useUpsertScopeMutation(trustAccountId);

  const form = useForm<TrustScopeFormValues>({
    defaultValues: EMPTY_TRUST_SCOPE_FORM_VALUES
  });

  const scopeDefaults = useMemo(() => toTrustScopeFormValues(scope), [scope]);

  useEffect(() => {
    form.reset(scopeDefaults);
  }, [form, scopeDefaults]);

  const handleSave = form.handleSubmit(async values => {
    const result = await upsertScopeMutation.mutateAsync(toTrustScopeDetailsDTO(values));
    form.reset(toTrustScopeFormValues(result.data.scope));
  });

  const handleCancel = () => {
    form.reset(scopeDefaults);
    upsertScopeMutation.reset();
  };

  const allValues = useWatch({control: form.control, defaultValue: EMPTY_TRUST_SCOPE_FORM_VALUES});
  const validationResult = TrustScopeFormSchema.safeParse(allValues);
  const hasErrors = !validationResult.success;
  const fieldErrors = flattenFieldErrors(validationResult.success ? null : validationResult.error);

  const isDirty = form.formState.isDirty;
  const isSaving = upsertScopeMutation.isPending;

  const onSaveRef = useRef(handleSave);
  onSaveRef.current = handleSave;
  const onCancelRef = useRef(handleCancel);
  onCancelRef.current = handleCancel;

  useEffect(() => {
    onFormStateChange?.({
      isDirty,
      isLoading,
      isSaving,
      isError,
      hasErrors,
      onSave: () => onSaveRef.current(),
      onCancel: () => onCancelRef.current()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, isLoading, isSaving, isError, hasErrors]);

  return {
    form,
    handleSave,
    handleCancel,
    isDirty,
    isSaving,
    isLoading,
    isError,
    saveError: upsertScopeMutation.error,
    hasErrors,
    fieldErrors
  };
};
