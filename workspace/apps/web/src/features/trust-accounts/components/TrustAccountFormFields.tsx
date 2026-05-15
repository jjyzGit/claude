import {Badge, FieldInput, FieldSelect, Icon, Tooltip} from '@sollapay/ui/components';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {ErrorAlertMessage} from '@/components';

import {TRUST_PURPOSE_CONFIG} from '../config';

import type {TrustPurposeConfig} from '../config';
import type {TrustPurpose} from '@sollapay/enums';
import type {FC, ReactNode} from 'react';

type TrustAccountFormFieldsProps = {
  name: string;
  onNameChange: (value: string) => void;
  trustPurpose: string;
  onTrustPurposeChange: (value: string) => void;
  submitError: unknown;
};

export const TrustAccountFormFields: FC<TrustAccountFormFieldsProps> = ({
  name,
  onNameChange,
  trustPurpose,
  onTrustPurposeChange,
  submitError
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);

  const trustPurposeOptions = useMemo(
    () =>
      (Object.entries(TRUST_PURPOSE_CONFIG) as Array<[TrustPurpose, TrustPurposeConfig]>).map(
        ([value, {labelKey, comingSoon}]) => ({
          value,
          disabled: comingSoon,
          label: t(labelKey),
          badge: comingSoon ? (
            <Badge size="sm" variant="gray">
              {t('common:comingSoon')}
            </Badge>
          ) : undefined
        })
      ),
    [t]
  );

  const purposeLabel: ReactNode = (
    <span className="flex items-center gap-1">
      {t('modal.purposeLabel')}
      <span onClick={e => e.preventDefault()}>
        <Tooltip content={t('modal.purposeTooltip')}>
          <Icon name="help-circle" className="size-4 text-fg-quaternary" />
        </Tooltip>
      </span>
    </span>
  );

  return (
    <div className="space-y-4">
      {submitError != null && <ErrorAlertMessage error={submitError} />}

      <FieldInput
        label={t('modal.nameLabel')}
        value={name}
        onChange={event => onNameChange(event.target.value)}
        placeholder={t('modal.namePlaceholder')}
      />

      <FieldSelect
        label={purposeLabel}
        value={trustPurpose}
        onValueChange={onTrustPurposeChange}
        placeholder={t('modal.selectPlaceholder')}
        options={trustPurposeOptions}
      />
    </div>
  );
};
