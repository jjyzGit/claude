import {Skeleton} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TrustAccountBreadcrumbs} from '@/features/trust-accounts/components';
import {PageHeader} from '@/layouts';

import {TrustAccountViewTabs} from './TrustAccountViewTabs';

import type {TrustAccountViewTab} from '../utils';
import type {FC} from 'react';

export interface TrustAccountViewHeaderSkeletonProps {
  activeTab: TrustAccountViewTab;
  onTabChange: (tab: TrustAccountViewTab) => void;
}

export const TrustAccountViewHeaderSkeleton: FC<TrustAccountViewHeaderSkeletonProps> = ({
  activeTab,
  onTabChange
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <PageHeader
      data-slot="trust-account-view-header-skeleton"
      title=""
      titleNode={<Skeleton className="h-8 w-48" />}
      description={
        <div className="flex items-center gap-6">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      }
      badge={<Skeleton className="h-5 w-20 rounded-full" />}
      actions={
        <div className="flex items-center gap-4 rounded-xl border border-border ps-4 pe-6 py-3">
          <Skeleton className="size-10 shrink-0 rounded-md" />
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-28" />
          </div>
        </div>
      }
      breadcrumbs={<TrustAccountBreadcrumbs title={t(`view.tabs.${activeTab}`)} />}
      tabs={
        <TrustAccountViewTabs
          buyersCount={0}
          transactionsCount={0}
          documentsCount={0}
          beneficiariesCount={0}
          value={activeTab}
          onValueChange={onTabChange}
        />
      }
    />
  );
};
