import {AiBadge, FieldDatePicker, FieldInput, Icon} from '@sollapay/ui/components';
import {validateEmail, validateIsraeliNationalId, parsePhoneToE164} from '@sollapay/utils';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {FC} from 'react';
import type {UseFormReturn} from 'react-hook-form';

export interface BuyerPersonFieldsProps {
  form: UseFormReturn<CreateBuyerFormValues>;
  index: number;
  aiFields: Map<string, AiSuggestion>;
  markFieldModified: (field: string) => void;
}

export const BuyerPersonFields: FC<BuyerPersonFieldsProps> = ({
  form,
  index,
  aiFields,
  markFieldModified
}) => {
  const {t} = useTranslation('trustAccounts');
  const {
    register,
    control,
    formState: {errors}
  } = form;
  const prefix = 'view.buyers.addBuyerModal.buyerDetails';

  const fp = (name: string) => `buyers.${index}.${name}`;

  const aiBadge = (name: string) => (aiFields.has(fp(name)) ? <AiBadge /> : undefined);

  const onAiChange = (name: string) => {
    if (aiFields.has(fp(name))) markFieldModified(fp(name));
  };

  const buyerErrors = errors.buyers?.[index];

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FieldInput
          label={t(`${prefix}.name`)}
          placeholder={t(`${prefix}.namePlaceholder`)}
          error={buyerErrors?.fullName?.message}
          required
          startAdornment={<Icon name="user" width={16} height={16} />}
          badge={aiBadge('fullName')}
          {...register(`buyers.${index}.fullName` as `buyers.0.fullName`, {
            required: t('view.buyers.errors.nameRequired'),
            onChange: () => onAiChange('fullName')
          })}
        />
        <FieldInput
          label={t(`${prefix}.nationalId`)}
          placeholder={t(`${prefix}.nationalIdPlaceholder`)}
          error={buyerErrors?.nationalId?.message}
          required
          startAdornment={<Icon name="shield" width={16} height={16} />}
          badge={aiBadge('nationalId')}
          {...register(`buyers.${index}.nationalId` as `buyers.0.nationalId`, {
            required: t('view.buyers.errors.nationalIdRequired'),
            validate: val =>
              !val || !validateIsraeliNationalId(val) || t('view.buyers.errors.invalidIsraeliId'),
            onChange: () => onAiChange('nationalId')
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FieldInput
          label={t(`${prefix}.email`)}
          placeholder={t(`${prefix}.emailPlaceholder`)}
          error={buyerErrors?.email?.message}
          type="email"
          required
          startAdornment={<Icon name="mail" width={16} height={16} />}
          badge={aiBadge('email')}
          {...register(`buyers.${index}.email` as `buyers.0.email`, {
            required: t('view.buyers.errors.emailRequired'),
            validate: val => !val || !validateEmail(val) || t('view.buyers.errors.invalidEmail'),
            onChange: () => onAiChange('email')
          })}
        />
        <FieldInput
          label={t(`${prefix}.phone`)}
          placeholder={t(`${prefix}.phonePlaceholder`)}
          error={buyerErrors?.phone?.message}
          required
          startAdornment={<Icon name="phone" width={16} height={16} />}
          badge={aiBadge('phone')}
          {...register(`buyers.${index}.phone` as `buyers.0.phone`, {
            required: t('view.buyers.errors.phoneRequired'),
            validate: val =>
              !val || parsePhoneToE164(val) !== null || t('view.buyers.errors.invalidPhone'),
            onChange: () => onAiChange('phone')
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Controller
          name={`buyers.${index}.dateOfBirth` as `buyers.0.dateOfBirth`}
          control={control}
          rules={{required: t('view.buyers.errors.dateOfBirthRequired')}}
          render={({field}) => (
            <FieldDatePicker
              label={t(`${prefix}.dateOfBirth`)}
              placeholder={t(`${prefix}.dateOfBirthPlaceholder`)}
              error={buyerErrors?.dateOfBirth?.message}
              required
              value={field.value}
              onChange={value => {
                field.onChange(value);
                onAiChange('dateOfBirth');
              }}
              onBlur={field.onBlur}
              badge={aiBadge('dateOfBirth')}
            />
          )}
        />
        <FieldInput
          label={t(`${prefix}.address`)}
          placeholder={t(`${prefix}.addressPlaceholder`)}
          error={buyerErrors?.address?.message}
          required
          startAdornment={<Icon name="home" width={16} height={16} />}
          badge={aiBadge('address')}
          {...register(`buyers.${index}.address` as `buyers.0.address`, {
            required: t('view.buyers.errors.addressRequired'),
            onChange: () => onAiChange('address')
          })}
        />
      </div>
    </>
  );
};
