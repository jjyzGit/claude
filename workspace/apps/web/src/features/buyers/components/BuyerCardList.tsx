import {BuyerCard} from './BuyerCard';

import type {BuyerTableRow} from '../types/buyers.types';
import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerCardListProps {
  rows: BuyerTableRow[];
  onRequestPayment: (buyer: BuyerDTO) => void;
  onViewBuyer: (buyer: BuyerDTO) => void;
  trustAccountId: string;
}

export const BuyerCardList: FC<BuyerCardListProps> = ({
  rows,
  onRequestPayment,
  onViewBuyer,
  trustAccountId
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {rows.map(row => (
        <BuyerCard
          key={row.buyers[0].id}
          row={row}
          onRequestPayment={onRequestPayment}
          onViewBuyer={onViewBuyer}
          trustAccountId={trustAccountId}
        />
      ))}
    </div>
  );
};
