import {useBuyersQuery} from './useBuyersQuery';

import type {BuyerDTO} from '@sollapay/types';

interface UsePurchaseBuyersResult {
  buyers: BuyerDTO[];
  isLoading: boolean;
}

/**
 * Returns all buyers sharing the given purchase, with contextBuyerId placed first.
 * Defers the buyers query until purchaseId is defined — safe to call unconditionally.
 */
export function usePurchaseBuyers(
  trustAccountId: string,
  purchaseId: string | undefined,
  contextBuyerId?: string
): UsePurchaseBuyersResult {
  const {data: allBuyers = [], isLoading} = useBuyersQuery(purchaseId ? trustAccountId : '');

  if (!purchaseId) {
    return {buyers: [], isLoading: false};
  }

  const filtered = allBuyers.filter(b => b.purchases.some(p => p.id === purchaseId));

  if (!contextBuyerId) {
    return {buyers: filtered, isLoading};
  }

  const contextIndex = filtered.findIndex(b => b.id === contextBuyerId);
  const contextBuyer = filtered[contextIndex];
  if (contextIndex <= 0 || !contextBuyer) {
    return {buyers: filtered, isLoading};
  }

  return {
    buyers: [contextBuyer, ...filtered.slice(0, contextIndex), ...filtered.slice(contextIndex + 1)],
    isLoading
  };
}
