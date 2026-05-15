import {Badge, Icon, Tabs} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

import type {TrustAccountViewTab} from './TrustAccountViewHeader';
import type {TabItem} from '@sollapay/ui';
import type {FC} from 'react';

export interface TrustAccountViewTabsProps {
  buyersCount: number;
  transactionsCount: number;
  documentsCount: number;
  beneficiariesCount: number;
  value: TrustAccountViewTab;
  onValueChange: (value: TrustAccountViewTab) => void;
}

export const TrustAccountViewTabs: FC<TrustAccountViewTabsProps> = ({
  buyersCount,
  transactionsCount,
  documentsCount,
  beneficiariesCount,
  value,
  onValueChange
}) => {
  const {t} = useTranslation('trustAccounts');

  const tabs: TabItem[] = [
    {
      value: 'overview',
      label: (
        <>
          <Icon name="line-chart" className="size-4" />
          {t('view.tabs.overview')}
        </>
      )
    },
    {
      value: 'buyers',
      label: (
        <>
          <Icon name="users" className="size-4" />
          {t('view.tabs.buyers')}
          <Badge variant="gray" size="sm" className="font-medium">
            {buyersCount}
          </Badge>
        </>
      )
    },
    {
      value: 'transactions',
      label: (
        <>
          <Icon name="currency" className="size-4" />
          {t('view.tabs.transactions')}
          <Badge variant="gray" size="sm" className="font-medium">
            {transactionsCount}
          </Badge>
        </>
      )
    },
    {
      value: 'documents',
      label: (
        <>
          <Icon name="file" className="size-4" />
          {t('view.tabs.documents')}
          <Badge variant="gray" size="sm" className="font-medium">
            {documentsCount}
          </Badge>
        </>
      )
    },
    {
      value: 'beneficiaries',
      label: (
        <>
          <Icon name="coins-swap" className="size-4" />
          {t('view.tabs.beneficiaries')}
          <Badge variant="gray" size="sm" className="font-medium">
            {beneficiariesCount}
          </Badge>
        </>
      )
    }
  ];

  return (
    <Tabs
      tabs={tabs}
      value={value}
      onValueChange={val => onValueChange(val as TrustAccountViewTab)}
      variant="primary"
      listClassName="w-full"
      hideBorder
    />
  );
};
