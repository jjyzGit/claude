import {Button, ContentSection, Icon, ListEmptySearch} from '@sollapay/ui/components';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {ListExportMenu} from '@/components';
import {
  BuyerCardList,
  BuyerCardListSkeleton,
  BuyerListSectionHeader,
  BuyerTable,
  BuyerTableSkeleton
} from '@/features/buyers/components';
import {createBuyerExportColumns} from '@/features/buyers/config/buyer-export.config';
import {DEFAULT_BUYER_FILTER_STATE} from '@/features/buyers/config/buyer-filter.config';
import {BUYER_SORT_CONFIG} from '@/features/buyers/config/buyer-sorting.config';
import {
  useBuyersQuery,
  useFilteredBuyers,
  usePaymentsQuery,
  usePurchaseBuyers
} from '@/features/buyers/hooks';
import {AddBuyerFlow, InitiatePaymentFlow} from '@/features/buyers/modals';
import {buildBuyerTableRows} from '@/features/buyers/utils';
import {useListSorting, useListViewPreference} from '@/hooks';

import {BuyersEmptyState} from './BuyersEmptyState';

import type {TrustAccountTabContext} from '../../TrustAccountView';
import type {BuyerFilterState} from '@/features/buyers/config/buyer-filter.config';
import type {BuyerTableRow} from '@/features/buyers/types/buyers.types';
import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

interface BuyersTabContentProps {
  trustAccount: TrustAccountTabContext;
}

export const BuyersTabContent: FC<BuyersTabContentProps> = ({
  trustAccount: {id: trustAccountId, refId: trustAccountRefId, name: trustAccountName}
}) => {
  const {t, i18n} = useTranslation('trustAccounts');
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<BuyerFilterState>(DEFAULT_BUYER_FILTER_STATE);
  const [paymentBuyer, setPaymentBuyer] = useState<BuyerDTO | null>(null);
  const openAddBuyerRef = useRef<(() => void) | null>(null);

  const {data: buyers = [], isLoading: isBuyersLoading} = useBuyersQuery(trustAccountId);
  const {data: payments = [], isLoading: isPaymentsLoading} = usePaymentsQuery(trustAccountId);

  const {buyers: paymentBuyers} = usePurchaseBuyers(
    trustAccountId,
    paymentBuyer?.purchases[0]?.id,
    paymentBuyer?.id ?? undefined
  );
  const isLoading = isBuyersLoading || isPaymentsLoading;
  const {view, setPreferredView} = useListViewPreference('buyers:view');

  const allRows = useMemo(() => buildBuyerTableRows(buyers, payments), [buyers, payments]);
  const filteredRows = useFilteredBuyers(allRows, searchText, filter);
  const {
    sorting,
    onSortingChange,
    sortedItems: sortedRows
  } = useListSorting(filteredRows, BUYER_SORT_CONFIG);

  const buyerExportColumns = useMemo(
    () => createBuyerExportColumns(t, i18n.language),
    [t, i18n.language]
  );

  const handleViewBuyer = useCallback(
    (buyer: BuyerDTO) => {
      navigate(`/trust-accounts/${trustAccountId}/buyers/${buyer.id}`);
    },
    [navigate, trustAccountId]
  );

  const isEmpty = buyers.length === 0 && !isLoading;

  return (
    <>
      {/* Captures onOpen into a ref without rendering any UI — keeps AddBuyerFlow
          at a stable tree position so flow state survives the empty→non-empty
          transition when the buyers query refetches after creation. */}
      <AddBuyerFlow
        trustAccountId={trustAccountId}
        trigger={onOpen => {
          openAddBuyerRef.current = onOpen;
          return null;
        }}
      />

      {isEmpty ? (
        <BuyersEmptyState onAddBuyer={() => openAddBuyerRef.current?.()} />
      ) : (
        <>
          <ContentSection
            title={t('view.buyers.list.header.title')}
            subtitle={t('view.buyers.list.header.description')}
            action={
              <Button variant="primary" size="sm" onClick={() => openAddBuyerRef.current?.()}>
                <Icon name="add" />
                {t('view.buyers.empty.action')}
              </Button>
            }
          >
            <div className="flex flex-col gap-6">
              <BuyerListSectionHeader
                searchText={searchText}
                onSearchChange={setSearchText}
                sorting={sorting}
                onSortingChange={onSortingChange}
                view={view}
                onViewChange={setPreferredView}
                filter={filter}
                onFilterChange={setFilter}
                exportMenu={
                  <ListExportMenu<BuyerTableRow>
                    rows={sortedRows}
                    columns={buyerExportColumns}
                    refId={trustAccountRefId}
                    entity="buyers"
                    sheetName={trustAccountName}
                    disabled={sortedRows.length === 0}
                  />
                }
              />

              {isLoading ? (
                view === 'card' ? (
                  <BuyerCardListSkeleton />
                ) : (
                  <BuyerTableSkeleton />
                )
              ) : sortedRows.length === 0 ? (
                <ListEmptySearch
                  title={t('view.buyers.list.emptySearch.title')}
                  subtitle={
                    <Trans
                      t={t}
                      i18nKey="view.buyers.list.emptySearch.subtitle"
                      values={{term: searchText}}
                      components={{
                        bold: <strong className="font-semibold text-fg-secondary" />,
                        br: <br />
                      }}
                    />
                  }
                  clearLabel={t('view.buyers.list.emptySearch.clear')}
                  onClear={() => setSearchText('')}
                />
              ) : view === 'card' ? (
                <BuyerCardList
                  rows={sortedRows}
                  onRequestPayment={setPaymentBuyer}
                  onViewBuyer={handleViewBuyer}
                  trustAccountId={trustAccountId}
                />
              ) : (
                <BuyerTable
                  rows={sortedRows}
                  sorting={sorting}
                  onSortingChange={onSortingChange}
                  onRequestPayment={setPaymentBuyer}
                  onViewBuyer={handleViewBuyer}
                  trustAccountId={trustAccountId}
                />
              )}
            </div>
          </ContentSection>

          {paymentBuyer && (
            <InitiatePaymentFlow
              trustAccountId={trustAccountId}
              buyers={paymentBuyers}
              isOpen={true}
              onClose={() => setPaymentBuyer(null)}
            />
          )}
        </>
      )}
    </>
  );
};

export type {BuyersTabContentProps};
