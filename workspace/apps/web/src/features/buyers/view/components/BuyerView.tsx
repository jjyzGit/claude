import {Badge, Typography} from '@sollapay/ui/components';
import {parseMoney} from '@sollapay/utils';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ErrorAlertMessage} from '@/components';
import {PageContent, PageLayout} from '@/layouts';

import {usePurchaseBuyers} from '../../hooks';
import {useBuyerUnitParam} from '../hooks';
import {BuyerUnitContent} from './BuyerUnitContent';
import {BuyerUnitTabs} from './BuyerUnitTabs';
import {BuyerViewHeader} from './BuyerViewHeader';
import {InitiatePaymentFlow} from '../../modals/InitiatePaymentFlow';
import {computeRemainingAmountNis, formatUnitLabel} from '../../utils';

import type {BuyerWithDocumentsDTO, PaymentInstructionDTO} from '@sollapay/types';
import type {FC} from 'react';

interface BuyerViewProps {
  buyer: BuyerWithDocumentsDTO;
  trustAccountId: string;
  trustAccountName: string;
  payments: PaymentInstructionDTO[];
  paymentsError?: boolean;
}

export const BuyerView: FC<BuyerViewProps> = ({
  buyer,
  trustAccountId,
  trustAccountName,
  payments,
  paymentsError
}) => {
  const {t} = useTranslation('trustAccounts');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const unitIds = useMemo(() => buyer.purchases.map(p => p.unit.id), [buyer.purchases]);
  const unitLabels = useMemo(
    () => buyer.purchases.map(p => formatUnitLabel(p.unit, t)),
    [buyer.purchases, t]
  );

  const {selectedIndex, setSelectedUnit} = useBuyerUnitParam(unitIds);

  const selectedPurchase = buyer.purchases[selectedIndex];
  const {buyers: purchaseBuyers} = usePurchaseBuyers(
    trustAccountId,
    selectedPurchase?.id,
    buyer.id
  );
  const buyersForPayment = purchaseBuyers.length > 0 ? purchaseBuyers : [buyer];
  const unitCount = buyer.purchases.length;

  const canRequestPayment = useMemo(() => {
    if (!selectedPurchase) return false;
    return parseMoney(computeRemainingAmountNis(selectedPurchase, payments)).toNumber() > 0;
  }, [selectedPurchase, payments]);

  const handleRequestPayment = useCallback(() => setIsPaymentOpen(true), []);
  const handleClosePayment = useCallback(() => setIsPaymentOpen(false), []);

  return (
    <PageLayout>
      <BuyerViewHeader
        buyer={buyer}
        trustAccountId={trustAccountId}
        trustAccountName={trustAccountName}
      />

      <PageContent className="flex flex-col gap-8">
        {paymentsError && <ErrorAlertMessage error={t('view.buyers.detail.paymentsError')} />}
        {/* Purchased units heading + unit tabs on same row */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <Typography size="lg" weight="semibold">
              {t('view.buyers.detail.purchasedUnits')}
            </Typography>
            <Badge variant="gray" size="lg">
              {t('view.buyers.detail.unitCount', {count: unitCount})}
            </Badge>
          </div>
          {unitCount > 1 && (
            <BuyerUnitTabs
              units={unitLabels}
              selectedIndex={selectedIndex}
              onSelect={setSelectedUnit}
            />
          )}
        </div>

        {/* Per-unit content */}
        {selectedPurchase && (
          <BuyerUnitContent
            purchase={selectedPurchase}
            instructions={payments}
            trustAccountId={trustAccountId}
            buyerId={buyer.id}
            onRequestPayment={handleRequestPayment}
            requestPaymentDisabled={!canRequestPayment}
          />
        )}
      </PageContent>

      <InitiatePaymentFlow
        trustAccountId={trustAccountId}
        buyers={buyersForPayment}
        isOpen={isPaymentOpen}
        onClose={handleClosePayment}
        payments={payments}
        selectedPurchaseIndex={selectedIndex}
      />
    </PageLayout>
  );
};
