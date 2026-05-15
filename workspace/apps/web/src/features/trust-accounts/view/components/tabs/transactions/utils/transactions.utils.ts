import {
  InitiationMethod,
  TransactionDirection,
  TransactionGroupBy,
  TransactionStatus
} from '@sollapay/enums';
import {Money, parseMoney} from '@sollapay/utils';

import type {TransactionsFilterState} from '../config/transactions-filter.config';
import type {TrustAccountTransactionDTO, TrustAccountTransactionGroupDTO} from '@sollapay/types';

export function countTransactionsActiveFilters(filter: TransactionsFilterState): number {
  let count = 0;
  if (filter.datePreset !== 'all') count++;
  if (filter.amountMin != null || filter.amountMax != null) count++;
  if (filter.initiationMethods.length > 0) count++;
  if (filter.directions.length > 0) count++;
  return count;
}

export function isTransactionsFilterActive(filter: TransactionsFilterState): boolean {
  return countTransactionsActiveFilters(filter) > 0;
}

/**
 * Filters a flat list of transactions by filter state and search string.
 */
export function filterTransactions(
  transactions: TrustAccountTransactionDTO[],
  filter: TransactionsFilterState,
  search: string
): TrustAccountTransactionDTO[] {
  const searchLower = search.toLowerCase().trim();
  return transactions.filter(tx => matchesFilter(tx, filter, searchLower));
}

/**
 * Groups a flat list of transactions by the given strategy, sorts each group,
 * and computes totalBalanceNis from APPLIED transactions only.
 */
export function groupTransactions(
  transactions: TrustAccountTransactionDTO[],
  groupBy: TransactionGroupBy
): TrustAccountTransactionGroupDTO[] {
  const groupMap = new Map<string, TrustAccountTransactionDTO[]>();

  for (const tx of transactions) {
    const groupKey = resolveGroupKey(tx, groupBy);
    const existing = groupMap.get(groupKey);
    if (existing) {
      existing.push(tx);
    } else {
      groupMap.set(groupKey, [tx]);
    }
  }

  const entries = Array.from(groupMap.entries());

  entries.sort(([aKey], [bKey]) => {
    switch (groupBy) {
      case TransactionGroupBy.DATE:
        return bKey.localeCompare(aKey); // newest first
      case TransactionGroupBy.STATUS:
        if (aKey === TransactionStatus.APPLIED && bKey !== TransactionStatus.APPLIED) return -1;
        if (bKey === TransactionStatus.APPLIED && aKey !== TransactionStatus.APPLIED) return 1;
        return 0;
      case TransactionGroupBy.DIRECTION:
        if (aKey === TransactionDirection.CREDIT && bKey !== TransactionDirection.CREDIT) return -1;
        if (bKey === TransactionDirection.CREDIT && aKey !== TransactionDirection.CREDIT) return 1;
        return 0;
      default:
        return aKey.localeCompare(bKey);
    }
  });

  return entries.map(([groupKey, txs]) => ({
    groupKey,
    totalBalanceNis: computeGroupBalance(txs),
    transactionCount: txs.length,
    transactions: txs
  }));
}

function resolveGroupKey(tx: TrustAccountTransactionDTO, groupBy: TransactionGroupBy): string {
  switch (groupBy) {
    case TransactionGroupBy.DATE:
      return tx.effectiveDate.slice(0, 10);
    case TransactionGroupBy.COUNTERPARTY:
      return tx.buyerId ?? 'unknown';
    case TransactionGroupBy.PURCHASE:
      return tx.purchaseId ?? 'unknown';
    case TransactionGroupBy.STATUS:
      return tx.status;
    case TransactionGroupBy.INITIATION_METHOD:
      return tx.initiationMethod ?? 'unknown';
    case TransactionGroupBy.DIRECTION:
      return tx.direction;
  }
}

function computeGroupBalance(txs: TrustAccountTransactionDTO[]): string {
  return txs
    .filter(tx => tx.status === TransactionStatus.APPLIED)
    .reduce((sum, tx) => {
      const amount = parseMoney(tx.amount);
      return tx.direction === TransactionDirection.CREDIT ? sum.add(amount) : sum.subtract(amount);
    }, Money.zero())
    .toString();
}

function matchesFilter(
  tx: TrustAccountTransactionDTO,
  filter: TransactionsFilterState,
  search: string
): boolean {
  if (search.length > 0 && !matchesSearch(tx, search)) return false;
  if (filter.datePreset !== 'all') {
    const days = filter.datePreset === '7d' ? 7 : filter.datePreset === '30d' ? 30 : 90;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    if (new Date(tx.effectiveDate) < cutoff) return false;
  }
  if (filter.initiationMethods.length > 0) {
    // RTP and PIS share the same filter option — treat them as equivalent
    const effectiveMethod =
      tx.initiationMethod === InitiationMethod.PIS ? InitiationMethod.RTP : tx.initiationMethod;
    if (effectiveMethod === null || !filter.initiationMethods.includes(effectiveMethod))
      return false;
  }
  if (filter.directions.length > 0 && !filter.directions.includes(tx.direction)) return false;
  if (filter.amountMin != null || filter.amountMax != null) {
    const amount = parseMoney(tx.amount).toNumber();
    if (filter.amountMin != null && amount < filter.amountMin) return false;
    if (filter.amountMax != null && amount > filter.amountMax) return false;
  }
  return true;
}

function matchesSearch(tx: TrustAccountTransactionDTO, search: string): boolean {
  return Boolean(
    tx.buyerName?.toLowerCase().includes(search) ||
    tx.unit?.buildingNumber.toLowerCase().includes(search) ||
    tx.unit?.unitNumber.toLowerCase().includes(search)
  );
}
