import {
  AiBadge,
  FieldInput,
  FieldMoneyInput,
  FormSectionHeading,
  Icon
} from '@sollapay/ui/components';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {FC} from 'react';
import type {UseFormReturn} from 'react-hook-form';

type ExtractableField = 'purchasePriceNis' | 'unit.buildingNumber' | 'unit.unitNumber';

export interface UnitDetailsSectionProps {
  form: UseFormReturn<CreateBuyerFormValues>;
  aiFields: Map<string, AiSuggestion>;
  markFieldModified: (field: string) => void;
}

export const UnitDetailsSection: FC<UnitDetailsSectionProps> = ({
  form,
  aiFields,
  markFieldModified
}) => {
  const {t} = useTranslation('trustAccounts');
  const {
    register,
    control,
    formState: {errors}
  } = form;
  const prefix = 'view.buyers.addBuyerModal.unitDetails';

  const aiBadge = (field: ExtractableField) => (aiFields.has(field) ? <AiBadge /> : undefined);

  const onAiFieldChange = (field: ExtractableField) => {
    if (aiFields.has(field)) markFieldModified(field);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormSectionHeading title={t(`${prefix}.title`)} />

      <div className="grid grid-cols-2 gap-6">
        <FieldInput
          label={t(`${prefix}.buildingNumber`)}
          placeholder={t(`${prefix}.buildingNumberPlaceholder`)}
          error={errors.unit?.buildingNumber?.message}
          required
          startAdornment={<Icon name="building" width={16} height={16} />}
          badge={aiBadge('unit.buildingNumber')}
          {...register('unit.buildingNumber', {
            required: t('view.buyers.errors.buildingNumberRequired'),
            onChange: () => onAiFieldChange('unit.buildingNumber')
          })}
        />
        <FieldInput
          label={t(`${prefix}.unitNumber`)}
          placeholder={t(`${prefix}.unitNumberPlaceholder`)}
          error={errors.unit?.unitNumber?.message}
          required
          startAdornment={<Icon name="hash" width={16} height={16} />}
          badge={aiBadge('unit.unitNumber')}
          {...register('unit.unitNumber', {
            required: t('view.buyers.errors.unitNumberRequired'),
            onChange: () => onAiFieldChange('unit.unitNumber')
          })}
        />
        <Controller
          name="purchasePriceNis"
          control={control}
          rules={{required: t('view.buyers.errors.purchasePriceRequired')}}
          render={({field}) => (
            <FieldMoneyInput
              label={t(`${prefix}.purchasePrice`)}
              placeholder={t(`${prefix}.purchasePricePlaceholder`)}
              error={errors.purchasePriceNis?.message}
              required
              value={field.value}
              onChange={value => {
                field.onChange(value);
                onAiFieldChange('purchasePriceNis');
              }}
              onBlur={field.onBlur}
              startAdornment={<span className="text-sm font-medium text-fg-tertiary">₪</span>}
              badge={aiBadge('purchasePriceNis')}
              className="col-span-2"
            />
          )}
        />
      </div>
    </div>
  );
};
