import {TrustStatus} from '@sollapay/enums';
import {
  Button,
  EmptyState,
  Icon,
  Illustration,
  SearchInput,
  ListViewPicker,
  ListEmptySearch
} from '@sollapay/ui/components';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useMemo, useRef, useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {ListSortingSelect} from '@/components';
import {useListSorting, useListViewPreference} from '@/hooks';
import {PageContent, PageHeader, PageLayout} from '@/layouts';

import {
  TrustAccountCardList,
  TrustAccountCardListSkeleton,
  TrustAccountFilter,
  TrustAccountTable,
  TrustAccountTableSkeleton
} from '../features/trust-accounts/components';
import {TRUST_ACCOUNT_SORT_CONFIG} from '../features/trust-accounts/config';
import {DEFAULT_FILTER_STATE} from '../features/trust-accounts/config/filter.config';
import {
  useFilteredTrustAccounts,
  useTrustAccountBalancesQuery,
  useTrustAccountsQuery
} from '../features/trust-accounts/hooks';
import {
  TrustAccountsPageModals,
  type TrustAccountsPageModalsHandle
} from '../features/trust-accounts/modals';

import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {FC} from 'react';

export const TrustAccountListPage: FC = () => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(DEFAULT_FILTER_STATE);
  const modalsRef = useRef<TrustAccountsPageModalsHandle | null>(null);
  const {data: accounts = [], isLoading, isError, refetch} = useTrustAccountsQuery();
  const {data: balancesData} = useTrustAccountBalancesQuery();
  const {view, setPreferredView} = useListViewPreference('trust-accounts:view', 'table');
  const hasActiveFilter =
    filter.statuses.length > 0 || filter.purposes.length > 0 || filter.createdAt !== 'all';
  const filteredAccounts = useFilteredTrustAccounts(accounts, searchText, filter);
  const sortConfig = useMemo(() => TRUST_ACCOUNT_SORT_CONFIG(balancesData?.data), [balancesData]);
  const {
    sorting,
    onSortingChange,
    sortedItems: sortedAccounts
  } = useListSorting(filteredAccounts, sortConfig);

  const handleOpenCreate = () => modalsRef.current?.openCreate();
  const handleOpenEdit = (account: TrustAccountListItemDTO) => modalsRef.current?.openEdit(account);
  const handleOpenDelete = (account: TrustAccountListItemDTO) =>
    modalsRef.current?.openDelete(account);
  const navigateToAccount = (account: TrustAccountListItemDTO, activeTab?: string) => {
    if (
      account.trustStatus === TrustStatus.SETUP_IN_PROGRESS ||
      account.trustStatus === TrustStatus.PENDING_VALIDATION ||
      account.trustStatus === TrustStatus.IN_REVIEW ||
      account.trustStatus === TrustStatus.ACTIVATION_PENDING
    ) {
      navigate(`/trust-accounts/${account.id}/activation`);
    } else if (account.trustStatus === TrustStatus.TRUST_ACTIVE) {
      const tabPath = activeTab ? `/${activeTab}` : '';
      navigate(`/trust-accounts/${account.id}${tabPath}`);
    }
  };

  const handleRowClick = (account: TrustAccountListItemDTO) => navigateToAccount(account);
  const handleAccountActionClick = (account: TrustAccountListItemDTO) =>
    navigateToAccount(account, 'buyers');

  const handleCreateSuccess = (id: string) => {
    setSearchText('');
    setFilter(DEFAULT_FILTER_STATE);
    navigate(`/trust-accounts/${id}/activation`);
  };

  const isFilterOnly = !searchText && hasActiveFilter;

  return (
    <PageLayout error={isError} refetch={() => void refetch()}>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        badge={t('accountCount', {count: accounts.length})}
        actions={
          <Button onClick={handleOpenCreate} icon={<Icon name="add" />}>
            {t('create')}
          </Button>
        }
      />
      <PageContent>
        {accounts.length === 0 && !isLoading ? (
          <div className="flex min-h-150 items-center justify-center">
            <EmptyState
              illustration={
                <Illustration width={166}>
                  <SearchIllustration />
                </Illustration>
              }
              title={t('noAccountsYet')}
              subtitle={t('noAccountsSubtitle')}
              action={
                <Button onClick={handleOpenCreate} icon={<Icon name="add" />}>
                  {t('create')}
                </Button>
              }
            />
          </div>
        ) : (
          <div data-slot="trust-account-content" className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                placeholder={t('search.placeholder')}
                className="w-80"
              />
              <div className="flex items-center gap-3">
                <TrustAccountFilter filter={filter} onChange={setFilter} />
                <ListSortingSelect
                  config={sortConfig}
                  sorting={sorting}
                  onSortingChange={onSortingChange}
                />
                <ListViewPicker
                  value={view}
                  onChange={setPreferredView}
                  tableLabel={t('viewPicker.tableView')}
                  cardLabel={t('viewPicker.cardView')}
                />
              </div>
            </div>
            {isLoading ? (
              view === 'card' ? (
                <TrustAccountCardListSkeleton />
              ) : (
                <TrustAccountTableSkeleton />
              )
            ) : sortedAccounts.length === 0 ? (
              <ListEmptySearch
                title={t('search.emptyTitle')}
                subtitle={
                  isFilterOnly ? (
                    <Trans t={t} i18nKey="search.emptySubtitleFiltered" components={{br: <br />}} />
                  ) : (
                    <Trans
                      t={t}
                      i18nKey="search.emptySubtitle"
                      values={{term: searchText}}
                      components={{
                        bold: <strong className="font-semibold text-fg-secondary" />,
                        br: <br />
                      }}
                    />
                  )
                }
                clearLabel={isFilterOnly ? t('search.clearFilters') : t('search.clearSearch')}
                onClear={
                  isFilterOnly ? () => setFilter(DEFAULT_FILTER_STATE) : () => setSearchText('')
                }
              />
            ) : view === 'card' ? (
              <TrustAccountCardList
                accounts={sortedAccounts}
                balancesMap={balancesData?.data}
                onEditAccount={handleOpenEdit}
                onDeleteAccount={handleOpenDelete}
                onAccountActionClick={handleAccountActionClick}
                onCardClick={handleRowClick}
              />
            ) : (
              <TrustAccountTable
                accounts={sortedAccounts}
                balancesMap={balancesData?.data}
                sorting={sorting}
                onSortingChange={onSortingChange}
                onEditAccount={handleOpenEdit}
                onDeleteAccount={handleOpenDelete}
                onAccountActionClick={handleAccountActionClick}
                onRowClick={handleRowClick}
              />
            )}
          </div>
        )}
      </PageContent>
      <TrustAccountsPageModals ref={modalsRef} onCreateSuccess={handleCreateSuccess} />
    </PageLayout>
  );
};
