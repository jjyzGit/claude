import {formatDateLocalized} from '@sollapay/utils';

import type {BeneficiaryRow} from './BeneficiariesTable';
import type {ExportColumn} from '@/utils';
import type {TFunction} from 'i18next';

export function createBeneficiaryExportColumns(
  t: TFunction,
  language: string
): ExportColumn<BeneficiaryRow>[] {
  return [
    {
      header: t('view.beneficiaries.columns.name'),
      value: row => row.name
    },
    {
      header: t('view.beneficiaries.columns.role'),
      value: row =>
        row.role === 'developer'
          ? t('view.beneficiaries.roles.developer')
          : t('view.beneficiaries.roles.buyer')
    },
    {
      header: t('view.beneficiaries.columns.idNumber'),
      value: row => row.idNumber
    },
    {
      header: t('view.beneficiaries.columns.date'),
      value: row => (row.date ? formatDateLocalized(row.date, language) : '')
    },
    {
      header: t('view.beneficiaries.columns.address'),
      value: row => row.address
    }
  ];
}
