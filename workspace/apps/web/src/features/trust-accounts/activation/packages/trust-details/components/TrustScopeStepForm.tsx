import {PayinType, PayoutType, TimeLength} from '@sollapay/enums';
import {
  FieldMoneyInput,
  FieldMultiSelect,
  FieldSelect,
  FieldTextarea,
  FormSectionHeading
} from '@sollapay/ui/components';
import {Controller, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {FormShell} from '@/components';
import {useShowErrors} from '@/features/trust-accounts/activation/hooks';

import {useTrustScopeForm} from '../hooks';

import type {FormStateSnapshot} from '@/hooks';
import type {TrustScopeDetailsDTO} from '@sollapay/types';
import type {FC} from 'react';

interface TrustScopeStepFormProps {
  trustAccountId: string;
  scope: TrustScopeDetailsDTO | null | undefined;
  isLoading: boolean;
  isError: boolean;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

export const TrustScopeStepForm: FC<TrustScopeStepFormProps> = ({
  trustAccountId,
  scope,
  isLoading,
  isError,
  onFormStateChange
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const showErrors = useShowErrors();
  const {form, handleSave, saveError, fieldErrors} = useTrustScopeForm({
    trustAccountId,
    scope,
    isLoading,
    isError,
    onFormStateChange
  });
  const {control, register} = form;

  const payoutTypes = useWatch({control, name: 'payoutTypes'}) ?? [];
  const payinTypes = useWatch({control, name: 'payinTypes'}) ?? [];

  const hasOtherPayout = payoutTypes.includes(PayoutType.OTHER);
  const hasOtherPayin = payinTypes.includes(PayinType.OTHER);

  const timeLengthOptions = [
    {
      value: TimeLength.LT_3M,
      label: t('activation.packages.trustDetails.form.options.timeLength.lt_3m')
    },
    {
      value: TimeLength.M3_6,
      label: t('activation.packages.trustDetails.form.options.timeLength.m3_6')
    },
    {
      value: TimeLength.GT_6M,
      label: t('activation.packages.trustDetails.form.options.timeLength.gt_6m')
    }
  ];

  const payoutTypeOptions = [
    {
      value: PayoutType.DEVELOPER_BANK_ACCOUNT,
      label: t('activation.packages.trustDetails.form.options.payoutTypes.developerBankAccount')
    },
    {
      value: PayoutType.FUNDED_BANK,
      label: t('activation.packages.trustDetails.form.options.payoutTypes.fundedBank')
    },
    {
      value: PayoutType.OTHER,
      label: t('activation.packages.trustDetails.form.options.payoutTypes.other')
    }
  ];

  const payinTypeOptions = [
    {
      value: PayinType.BUYERS,
      label: t('activation.packages.trustDetails.form.options.payinTypes.buyers')
    },
    {
      value: PayinType.OTHER,
      label: t('activation.packages.trustDetails.form.options.payinTypes.other')
    }
  ];

  const fe = (key: string) => (showErrors && fieldErrors[key] ? t(fieldErrors[key]) : undefined);

  return (
    <FormShell
      id="trust-scope-form"
      className="flex flex-col gap-6"
      onSubmit={handleSave}
      saveError={saveError}
    >
      <FormSectionHeading
        title={t('activation.packages.trustDetails.trustScope.title')}
        description={t('activation.packages.trustDetails.trustScope.description')}
      />
      <div className="grid grid-cols-2 gap-6">
        <Controller
          name="timeLength"
          control={control}
          render={({field}) => (
            <FieldSelect
              label={`${t('activation.packages.trustDetails.form.fields.timeLength')} *`}
              placeholder={t('activation.packages.trustDetails.form.fields.timeLengthPlaceholder')}
              value={field.value as TimeLength}
              onValueChange={(value: string) => field.onChange(value as TimeLength)}
              options={timeLengthOptions}
              error={fe('timeLength')}
            />
          )}
        />

        <Controller
          name="volume"
          control={control}
          render={({field}) => (
            <FieldMoneyInput
              name={field.name}
              label={`${t('activation.packages.trustDetails.form.fields.volume')} *`}
              placeholder={t('activation.packages.trustDetails.form.fields.volumePlaceholder')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fe('volume')}
            />
          )}
        />

        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Controller
              name="payinTypes"
              control={control}
              render={({field}) => (
                <FieldMultiSelect
                  label={`${t('activation.packages.trustDetails.form.fields.payinTypes')} *`}
                  placeholder={t(
                    'activation.packages.trustDetails.form.fields.payinTypesPlaceholder'
                  )}
                  value={field.value}
                  onValueChange={(values: string[]) => field.onChange(values as PayinType[])}
                  options={payinTypeOptions}
                  error={fe('payinTypes')}
                />
              )}
            />

            {hasOtherPayin && (
              <FieldTextarea
                placeholder={t(
                  'activation.packages.trustDetails.form.fields.payinOtherTextPlaceholder'
                )}
                error={fe('payinOtherText')}
                {...register('payinOtherText')}
              />
            )}
          </div>

          <div className="flex flex-col gap-6">
            <Controller
              name="payoutTypes"
              control={control}
              render={({field}) => (
                <FieldMultiSelect
                  label={`${t('activation.packages.trustDetails.form.fields.payoutTypes')} *`}
                  placeholder={t(
                    'activation.packages.trustDetails.form.fields.payoutTypesPlaceholder'
                  )}
                  value={field.value}
                  onValueChange={(values: string[]) => field.onChange(values as PayoutType[])}
                  options={payoutTypeOptions}
                  error={fe('payoutTypes')}
                />
              )}
            />

            {hasOtherPayout && (
              <FieldTextarea
                placeholder={t(
                  'activation.packages.trustDetails.form.fields.payoutOtherTextPlaceholder'
                )}
                error={fe('payoutOtherText')}
                {...register('payoutOtherText')}
              />
            )}
          </div>
        </div>
      </div>
    </FormShell>
  );
};
