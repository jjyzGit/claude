import {ModalSubNav} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {StepsMap} from '../config';
import type {FC} from 'react';

export type ActivationPackageStepsNavProps = {
  items: StepsMap;
  value: string;
  onChange: (value: string) => void;
  errorsMap?: Record<string, boolean>;
};

export const ActivationPackageStepsNav: FC<ActivationPackageStepsNavProps> = ({
  items,
  value,
  onChange,
  errorsMap
}) => {
  const {t} = useTranslation('trustAccounts');

  const steps = Object.entries(items).map(([v, {labelKey}]) => ({
    value: v,
    label: t(labelKey),
    hasError: errorsMap?.[v] === true
  }));

  return <ModalSubNav items={steps} value={value} onChange={onChange} />;
};
