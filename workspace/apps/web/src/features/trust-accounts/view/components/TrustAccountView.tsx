import {PageContent, PageLayout} from '@/layouts';

import {TrustAccountViewHeader, type TrustAccountViewTab} from './TrustAccountViewHeader';
import {useTrustAccountBadgeCounts} from '../hooks';
import {ActivityTabContent} from './tabs/activity';
import {BeneficiariesTabContent} from './tabs/beneficiaries';
import {BuyersTabContent} from './tabs/buyers';
import {DocumentsTabContent} from './tabs/documents';
import {TransactionsTabContent} from './tabs/transactions';

import type {TrustStatus} from '@sollapay/enums';
import type {TrustAccountLedgerDTO, TrustDeveloperDetailsDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface TrustAccountTabContext {
  id: string;
  refId: string;
  name: string;
}

export interface TrustAccountViewProps {
  id: string;
  name: string;
  refId: string;
  status: TrustStatus;
  balance?: TrustAccountLedgerDTO | null;
  developerDetails?: TrustDeveloperDetailsDTO | null;
  purpose?: string | null;
  activeTab: TrustAccountViewTab;
  onTabChange: (tab: TrustAccountViewTab) => void;
  isError?: boolean;
  refetch?: () => void;
}

const getTabContent = (activeTab: TrustAccountViewTab, trustAccount: TrustAccountTabContext) => {
  switch (activeTab) {
    case 'overview':
      return <ActivityTabContent trustAccount={trustAccount} />;
    case 'buyers':
      return <BuyersTabContent trustAccount={trustAccount} />;
    case 'transactions':
      return <TransactionsTabContent trustAccount={trustAccount} />;
    case 'documents':
      return <DocumentsTabContent trustAccount={trustAccount} />;
    case 'beneficiaries':
      return <BeneficiariesTabContent trustAccount={trustAccount} />;
    default:
      return null;
  }
};

export const TrustAccountView: FC<TrustAccountViewProps> = ({
  id,
  name,
  refId,
  status,
  balance,
  developerDetails,
  purpose,
  activeTab,
  onTabChange,
  isError,
  refetch
}) => {
  const {buyersCount, beneficiariesCount, transactionsCount, documentsCount} =
    useTrustAccountBadgeCounts({trustAccountId: id});

  return (
    <PageLayout error={isError} refetch={refetch}>
      <TrustAccountViewHeader
        trustAccountId={id}
        name={name}
        refId={refId}
        status={status}
        balance={balance}
        developerDetails={developerDetails}
        purpose={purpose}
        activeTab={activeTab}
        buyersCount={buyersCount}
        transactionsCount={transactionsCount}
        documentsCount={documentsCount}
        beneficiariesCount={beneficiariesCount}
        onTabChange={onTabChange}
      />
      <PageContent>{getTabContent(activeTab, {id, refId, name})}</PageContent>
    </PageLayout>
  );
};
