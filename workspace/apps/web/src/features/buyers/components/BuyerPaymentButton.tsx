import {useState} from 'react';

import {useBuyerQuery, usePurchaseBuyers} from '../hooks';
import {InitiatePaymentFlow} from '../modals';
import {BuyerActionButton} from './BuyerActionButton';

import type {BuyerPaymentStatus} from '../types/buyers.types';

export interface BuyerPaymentButtonProps {
  trustAccountId: string;
  partyId: string;
  paymentStatus: BuyerPaymentStatus;
  onViewBuyer: () => void;
  className?: string;
}

export function BuyerPaymentButton({
  trustAccountId,
  partyId,
  paymentStatus,
  onViewBuyer,
  className
}: BuyerPaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {data: buyer} = useBuyerQuery(trustAccountId, isOpen ? partyId : '');
  const {buyers: purchaseBuyers} = usePurchaseBuyers(
    trustAccountId,
    buyer?.purchases[0]?.id,
    buyer?.id
  );
  const buyersForPayment = purchaseBuyers.length > 0 ? purchaseBuyers : buyer ? [buyer] : [];

  return (
    <>
      <BuyerActionButton
        paymentStatus={paymentStatus}
        onRequestPayment={() => setIsOpen(true)}
        onViewBuyer={onViewBuyer}
        className={className}
      />
      {buyer && (
        <InitiatePaymentFlow
          trustAccountId={trustAccountId}
          buyers={buyersForPayment}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
