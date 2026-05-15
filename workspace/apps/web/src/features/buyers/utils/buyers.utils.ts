import {PaymentInstructionStatus} from '@sollapay/enums';
import {parseMoney} from '@sollapay/utils';

import {REQUIRED_DEPOSIT_PERCENTAGE} from '../constants/buyers.constants';

import type {BuyerPaymentStatus, BuyerTableRow} from '../types/buyers.types';
import type {InitiationMethod} from '@sollapay/enums';
import type {BuyerDTO, BuyerPurchaseDTO, PaymentInstructionDTO} from '@sollapay/types';

/** Returns true for instructions that are not in a terminal (failed/cancelled/expired) state */
export function isNonTerminalInstruction(i: PaymentInstructionDTO): boolean {
  return (
    i.status !== PaymentInstructionStatus.FAILED &&
    i.status !== PaymentInstructionStatus.CANCELLED &&
    i.status !== PaymentInstructionStatus.EXPIRED
  );
}

export function deriveBuyerPaymentStatus(
  instructions: PaymentInstructionDTO[]
): BuyerPaymentStatus {
  if (instructions.length === 0) return 'no_request';

  const active = instructions.filter(isNonTerminalInstruction);

  if (active.length === 0) {
    const allCancelled = instructions.every(i => i.status === PaymentInstructionStatus.CANCELLED);
    if (allCancelled) return 'cancelled';
    const allExpired = instructions.every(i => i.status === PaymentInstructionStatus.EXPIRED);
    if (allExpired) return 'expired';
    return 'no_request';
  }

  if (active.some(i => i.status === PaymentInstructionStatus.COMPLETED)) return 'completed';
  if (active.some(i => i.status === PaymentInstructionStatus.PARTIALLY_MATCHED)) return 'partial';
  return 'request_sent';
}

export function computeDepositPaidNis(instructions: PaymentInstructionDTO[]): string {
  return instructions
    .filter(
      i =>
        i.status === PaymentInstructionStatus.COMPLETED ||
        i.status === PaymentInstructionStatus.PARTIALLY_MATCHED
    )
    .reduce((sum, i) => sum.add(parseMoney(i.allocatedAmountNis)), parseMoney('0'))
    .toString();
}

/**
 * Computes how much can still be collected for a given purchase.
 * remaining = max collectable - already sent (non-terminal instructions)
 */
export function computeRemainingAmountNis(
  purchase: BuyerPurchaseDTO,
  payments: PaymentInstructionDTO[],
  maxPercentage = REQUIRED_DEPOSIT_PERCENTAGE
): string {
  const maxCollectable = parseMoney(purchase.purchasePriceNis).percentOf(maxPercentage);
  const purchaseInstructions = payments.filter(i => i.trustBuyerPurchaseId === purchase.id);
  const alreadySent = purchaseInstructions
    .filter(isNonTerminalInstruction)
    .reduce((sum, i) => sum.add(parseMoney(i.amountNis)), parseMoney('0'));
  const remaining = maxCollectable.subtract(alreadySent);
  return remaining.toNumber() > 0 ? remaining.toString() : '0';
}

/** Returns true when the "send payment" next button should be disabled */
export function isPaymentNextDisabled(opts: {
  initiationMethod: InitiationMethod | '';
  allowCustomAmount: boolean;
  customAmountNis: string;
  remainingAmountNis: string;
}): boolean {
  if (!opts.initiationMethod) return true;
  if (!opts.allowCustomAmount) return false;
  const amount = parseMoney(opts.customAmountNis || '0');
  return (
    !opts.customAmountNis ||
    opts.customAmountNis === '0' ||
    amount.toNumber() <= 0 ||
    amount.toNumber() > parseMoney(opts.remainingAmountNis).toNumber()
  );
}

export function buildBuyerTableRows(
  buyers: BuyerDTO[],
  instructions: PaymentInstructionDTO[]
): BuyerTableRow[] {
  // Use push (not spread) to avoid O(n²) allocations
  const instructionsByPurchase = new Map<string, PaymentInstructionDTO[]>();
  for (const instruction of instructions) {
    const existing = instructionsByPurchase.get(instruction.trustBuyerPurchaseId);
    if (existing) {
      existing.push(instruction);
    } else {
      instructionsByPurchase.set(instruction.trustBuyerPurchaseId, [instruction]);
    }
  }

  const buyersByPurchase = new Map<string, BuyerDTO[]>();
  for (const buyer of buyers) {
    const purchase = buyer.purchases[0];
    if (!purchase) continue;
    const existing = buyersByPurchase.get(purchase.id);
    if (existing) {
      existing.push(buyer);
    } else {
      buyersByPurchase.set(purchase.id, [buyer]);
    }
  }

  const rows: BuyerTableRow[] = [];

  for (const buyersForPurchase of buyersByPurchase.values()) {
    buyersForPurchase.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    const [primaryBuyer, ...rest] = buyersForPurchase as [BuyerDTO, ...BuyerDTO[]];
    const purchase = primaryBuyer.purchases[0]!;

    const purchaseInstructions = instructionsByPurchase.get(purchase.id) ?? [];
    const paymentStatus = deriveBuyerPaymentStatus(purchaseInstructions);
    const amountToPayNis = parseMoney(purchase.purchasePriceNis)
      .percentOf(REQUIRED_DEPOSIT_PERCENTAGE)
      .toString();
    const depositPaidNis = computeDepositPaidNis(purchaseInstructions);

    rows.push({
      buyers: [primaryBuyer, ...rest],
      purchase,
      amountToPayNis,
      depositPaidNis,
      paymentStatus
    });
  }

  return rows;
}
