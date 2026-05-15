import {TransactionGroupBy} from '@sollapay/enums';
import {SearchInput} from '@sollapay/ui';
import {ContentSection, ListEmptySearch} from '@sollapay/ui/components';
import {useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {useTrustAccountTransactionsQuery} from '@/features/trust-accounts/hooks';

import {DEFAULT_TRANSACTIONS_FILTER_STATE} from './config/transactions-filter.config';
import {TransactionsEmptyState} from './TransactionsEmptyState';
import {TransactionsFilter} from './TransactionsFilter';
import {TransactionsGroupBySelector} from './TransactionsGroupBySelector';
import {TransactionsTabContentSkeleton} from './TransactionsTabContent.skeleton';
import {TransactionsTimelineTable} from './TransactionsTimelineTable';
import {filterTransactions, groupTransactions} from './utils/transactions.utils';

import type {TrustAccountTabContext} from '../../TrustAccountView';
import type {TransactionsFilterState} from './config/transactions-filter.config';
import type {FC} from 'react';

interface TransactionsTabContentProps {
  trustAccount: TrustAccountTabContext;
}

export const TransactionsTabContent: FC<TransactionsTabContentProps> = ({
  trustAccount: {id: trustAccountId}
}) => {
  const {t} = useTranslation('trustAccounts');
  const [groupBy, setGroupBy] = useState<TransactionGroupBy>(TransactionGroupBy.DATE);
  const [filter, setFilter] = useState<TransactionsFilterState>(DEFAULT_TRANSACTIONS_FILTER_STATE);
  const [search, setSearch] = useState('');

  const transactionsQuery = useTrustAccountTransactionsQuery(trustAccountId);

  const allTransactions = useMemo(
    () => transactionsQuery.data?.data ?? [],
    [transactionsQuery.data]
  );

  const filteredGroups = useMemo(
    () => groupTransactions(filterTransactions(allTransactions, filter, search), groupBy),
    [allTransactions, filter, search, groupBy]
  );

  if (transactionsQuery.isLoading) {
    return <TransactionsTabContentSkeleton />;
  }

  return (
    <ContentSection
      title={t('view.transactions.sectionTitle')}
      subtitle={t('view.transactions.sectionSubtitle')}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t('view.transactions.search.placeholder')}
          />
          <div className="flex items-center gap-2">
            <TransactionsGroupBySelector value={groupBy} onChange={setGroupBy} />
            <TransactionsFilter
              filter={filter}
              onChange={setFilter}
              disabled={allTransactions.length === 0}
            />
          </div>
        </div>

        <TransactionsTimelineTable
          groups={filteredGroups}
          groupBy={groupBy}
          emptyState={
            allTransactions.length > 0 ? (
              <ListEmptySearch
                title={t('view.transactions.emptySearch.title')}
                subtitle={t('view.transactions.emptySearch.subtitle')}
                clearLabel={t('view.transactions.emptySearch.clear')}
                onClear={() => {
                  setSearch('');
                  setFilter(DEFAULT_TRANSACTIONS_FILTER_STATE);
                }}
              />
            ) : (
              <TransactionsEmptyState />
            )
          }
        />
      </div>
    </ContentSection>
  );
};

export type {TransactionsTabContentProps};
