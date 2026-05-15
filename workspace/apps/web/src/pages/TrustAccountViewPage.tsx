import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import {PageContent, PageLayout} from '@/layouts';

import {useTrustDetailsPackageQuery} from '../features/trust-accounts/activation/hooks';
import {useTrustAccountBalanceQuery, useTrustAccountQuery} from '../features/trust-accounts/hooks';
import {getTrustTypeLabel} from '../features/trust-accounts/utils';
import {TrustAccountView} from '../features/trust-accounts/view/components';
import {ActivityTabContentSkeleton} from '../features/trust-accounts/view/components/tabs/activity/ActivityTabContent.skeleton';
import {BeneficiariesTabContentSkeleton} from '../features/trust-accounts/view/components/tabs/beneficiaries/BeneficiariesTabContent.skeleton';
import {DocumentsTabContentSkeleton} from '../features/trust-accounts/view/components/tabs/documents/DocumentsTabContent.skeleton';
import {TransactionsTabContentSkeleton} from '../features/trust-accounts/view/components/tabs/transactions/TransactionsTabContent.skeleton';
import {TrustAccountViewHeaderSkeleton} from '../features/trust-accounts/view/components/TrustAccountViewHeader.skeleton';
import {useTrustAccountViewTab} from '../features/trust-accounts/view/hooks';

import type {TrustAccountViewTab} from '../features/trust-accounts/view/utils';
import type {FC} from 'react';

function getTabSkeleton(tab: TrustAccountViewTab) {
  switch (tab) {
    case 'overview':
      return <ActivityTabContentSkeleton />;
    case 'documents':
      return <DocumentsTabContentSkeleton />;
    case 'beneficiaries':
      return <BeneficiariesTabContentSkeleton />;
    case 'transactions':
      return <TransactionsTabContentSkeleton />;
    default:
      return null;
  }
}

export const TrustAccountViewPage: FC = () => {
  const {id} = useParams<{id: string}>();
  const {t} = useTranslation('trustAccounts');

  const {data: account, isLoading, isError, refetch} = useTrustAccountQuery(id ?? '');
  const {data: trustDetailsPackage} = useTrustDetailsPackageQuery(id ?? '');
  const {data: balanceData} = useTrustAccountBalanceQuery(id ?? '');

  const {activeTab, handleTabChange} = useTrustAccountViewTab();

  if (isLoading || !account)
    return (
      <PageLayout error={isError} refetch={() => void refetch()}>
        <TrustAccountViewHeaderSkeleton activeTab={activeTab} onTabChange={handleTabChange} />
        <PageContent>{getTabSkeleton(activeTab)}</PageContent>
      </PageLayout>
    );

  const {trustAccount} = account;
  const purpose = getTrustTypeLabel(trustAccount.trustPurpose, t);

  return (
    <TrustAccountView
      id={id ?? ''}
      name={trustAccount.name}
      refId={trustAccount.refId}
      status={trustAccount.trustStatus}
      balance={balanceData?.data ?? null}
      developerDetails={trustDetailsPackage?.data.developer ?? null}
      purpose={purpose}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      isError={isError}
      refetch={() => void refetch()}
    />
  );
};
