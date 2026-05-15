import {IconBox, Typography} from '@sollapay/ui/components';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '@/features/buyers/utils';
import {PurchaseDocumentsSection} from '@/features/purchases';

import {BuyerMetricsCard} from './BuyerMetricsCard';
import {BuyerPaymentHistorySection} from './BuyerPaymentHistorySection';

import type {BuyerPurchaseWithDocumentsDTO, PaymentInstructionDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerUnitContentProps {
  purchase: BuyerPurchaseWithDocumentsDTO;
  instructions: PaymentInstructionDTO[];
  trustAccountId: string;
  buyerId: string;
  onRequestPayment?: () => void;
  requestPaymentDisabled?: boolean;
}

export const BuyerUnitContent: FC<BuyerUnitContentProps> = ({
  purchase,
  instructions,
  trustAccountId,
  buyerId,
  onRequestPayment,
  requestPaymentDisabled
}) => {
  const {t} = useTranslation('trustAccounts');

  const purchaseInstructions = useMemo(
    () => instructions.filter(i => i.trustBuyerPurchaseId === purchase.id),
    [instructions, purchase.id]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconBox icon="building" size="sm" iconColor="tertiary" />
        <Typography size="display-xs" weight="semibold">
          {formatUnitLabel(purchase.unit, t)}
        </Typography>
      </div>

      <BuyerMetricsCard purchase={purchase} instructions={purchaseInstructions} />

      <BuyerPaymentHistorySection
        instructions={purchaseInstructions}
        unitLabel={formatUnitLabel(purchase.unit, t)}
        onRequestPayment={onRequestPayment}
        requestPaymentDisabled={requestPaymentDisabled}
      />

      <PurchaseDocumentsSection
        documents={purchase.documents}
        trustAccountId={trustAccountId}
        buyerId={buyerId}
        purchaseId={purchase.id}
      />
    </div>
  );
};
