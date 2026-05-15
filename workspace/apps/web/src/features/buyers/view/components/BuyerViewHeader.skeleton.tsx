import {Skeleton} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TrustAccountBreadcrumbs} from '@/features/trust-accounts/components';
import {PageHeader} from '@/layouts';

import type {FC} from 'react';

export const BuyerViewHeaderSkeleton: FC = () => {
  const {t} = useTranslation('trustAccounts');

  return (
    <PageHeader
      data-slot="buyer-view-header-skeleton"
      title=""
      titleNode={<Skeleton className="h-8 w-40" />}
      badge={<Skeleton className="h-5 w-20 rounded-full" />}
      breadcrumbs={<TrustAccountBreadcrumbs title={t('view.tabs.buyers')} />}
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
      actions={<Skeleton className="size-9 rounded-md" />}
    />
  );
};
