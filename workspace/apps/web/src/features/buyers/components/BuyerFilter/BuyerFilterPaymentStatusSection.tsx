import {ListFilterCheckboxSection} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {BUYER_PAYMENT_STATUS_FILTER_OPTIONS} from '../../config/buyer-filter.config';
import {BuyerPaymentStatusBadge} from '../BuyerPaymentStatusBadge';

import type {BuyerPaymentStatus} from '../../types/buyers.types';
import type {FC} from 'react';

export interface BuyerFilterPaymentStatusSectionProps {
  selected: BuyerPaymentStatus[];
  onChange: (selected: BuyerPaymentStatus[]) => void;
}

export const BuyerFilterPaymentStatusSection: FC<BuyerFilterPaymentStatusSectionProps> = ({
  selected,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');

  const options = BUYER_PAYMENT_STATUS_FILTER_OPTIONS.map(opt => ({
    value: opt.value,
    label: <BuyerPaymentStatusBadge status={opt.value} />
  }));

  return (
    <ListFilterCheckboxSection
      title={t('view.buyers.list.filter.sections.paymentStatus')}
      options={options}
      selected={selected}
      onChange={vals => onChange(vals as BuyerPaymentStatus[])}
    />
  );
};
