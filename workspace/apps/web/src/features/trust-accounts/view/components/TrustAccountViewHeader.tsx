import {cn, Tooltip} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

import {TrustAccountBadge, TrustAccountBreadcrumbs} from '@/features/trust-accounts/components';
import {PageHeader} from '@/layouts';

import {TrustAccountDeveloperMetaInfo} from './TrustAccountDeveloperMetaInfo';
import {TrustAccountViewBalanceMetric} from './TrustAccountViewBalanceMetric';
import {TrustAccountViewTabs} from './TrustAccountViewTabs';

import type {TrustAccountViewTab} from '../utils';
import type {TrustStatus} from '@sollapay/enums';
import type {TrustAccountLedgerDTO, TrustDeveloperDetailsDTO} from '@sollapay/types';
import type {FC} from 'react';

export type {TrustAccountViewTab};

export interface TrustAccountViewHeaderProps {
  trustAccountId: string;
  name: string;
  refId: string;
  status: TrustStatus;
  balance?: TrustAccountLedgerDTO | null;
  developerDetails?: TrustDeveloperDetailsDTO | null;
  purpose?: string | null;
  activeTab: TrustAccountViewTab;
  buyersCount: number;
  transactionsCount: number;
  documentsCount: number;
  beneficiariesCount: number;
  onTabChange: (tab: TrustAccountViewTab) => void;
}

export const TrustAccountViewHeader: FC<TrustAccountViewHeaderProps> = ({
  trustAccountId,
  name,
  refId,
  status,
  balance,
  developerDetails,
  purpose,
  activeTab,
  buyersCount,
  transactionsCount,
  documentsCount,
  beneficiariesCount,
  onTabChange
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);

  return (
    <PageHeader
      data-slot="trust-account-view-header"
      title={name}
      titleNode={
        <Tooltip content={t('activation.refIdTooltip', {refId})} side="top">
          {name}
        </Tooltip>
      }
      description={
        developerDetails ? (
          <TrustAccountDeveloperMetaInfo developerDetails={developerDetails} purpose={purpose} />
        ) : undefined
      }
      badge={<TrustAccountBadge status={status} showSubtitle={false} />}
      actions={
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            activeTab === 'overview' ? 'max-w-0 opacity-0' : 'max-w-[400px] opacity-100'
          )}
        >
          <TrustAccountViewBalanceMetric status={status} balance={balance} />
        </div>
      }
      breadcrumbs={
        <TrustAccountBreadcrumbs
          title={t(`trustAccounts:view.tabs.${activeTab}`)}
          name={name}
          trustAccountId={trustAccountId}
        />
      }
      tabs={
        <TrustAccountViewTabs
          buyersCount={buyersCount}
          transactionsCount={transactionsCount}
          documentsCount={documentsCount}
          beneficiariesCount={beneficiariesCount}
          value={activeTab}
          onValueChange={onTabChange}
        />
      }
    />
  );
};
