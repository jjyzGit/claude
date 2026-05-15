import {parseMoney} from '@sollapay/utils';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {config} from '@/app/app.config';
import {REQUIRED_DEPOSIT_PERCENTAGE} from '@/features/buyers/constants/buyers.constants';
import {useCreatePaymentInstructionMutation} from '@/features/buyers/hooks';
import {
  computeRemainingAmountNis,
  formatUnitLabel,
  isPaymentNextDisabled
} from '@/features/buyers/utils';

import {BuyersModal} from './BuyersModal';
import {PaymentRequestTabContent} from './BuyersModal/payment-request/PaymentRequestTabContent';
import {PaymentSentModal} from './PaymentSentModal';

import type {InitiationMethod} from '@sollapay/enums';
import type {BuyerDTO, PaymentInstructionDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface InitiatePaymentFlowProps {
  trustAccountId: string;
  /** All buyers sharing the same purchase — shows a select when more than one */
  buyers: BuyerDTO[];
  isOpen: boolean;
  onClose: () => void;
  /** All payment instructions for this trust account — used to compute remaining allowed amount */
  payments?: PaymentInstructionDTO[];
  /** Index of the selected purchase (unit). Defaults to 0. */
  selectedPurchaseIndex?: number;
}

type Step = 'payment-request' | 'payment-sent';

export const InitiatePaymentFlow: FC<InitiatePaymentFlowProps> = ({
  trustAccountId,
  buyers,
  isOpen,
  onClose,
  payments = [],
  selectedPurchaseIndex = 0
}) => {
  const {t} = useTranslation('trustAccounts');
  const [step, setStep] = useState<Step>('payment-request');
  const [initiationMethod, setInitiationMethod] = useState<InitiationMethod | ''>('');
  // Regenerated on each attempt to avoid idempotency key reuse on retry
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const [customAmountNis, setCustomAmountNis] = useState('');
  const [selectedBuyerId, setSelectedBuyerId] = useState(() => buyers[0]?.id ?? '');

  const createPaymentMutation = useCreatePaymentInstructionMutation(trustAccountId);

  const selectedBuyer = buyers.find(b => b.id === selectedBuyerId) ?? buyers[0];
  const purchase = selectedBuyer
    ? (selectedBuyer.purchases[selectedPurchaseIndex] ?? selectedBuyer.purchases[0])
    : undefined;
  const unitLabel = purchase ? formatUnitLabel(purchase.unit, t) : undefined;
  const maxAmountNis = purchase
    ? parseMoney(purchase.purchasePriceNis).percentOf(REQUIRED_DEPOSIT_PERCENTAGE).toString()
    : '0';

  const remainingAmountNis = useMemo(
    () => (purchase ? computeRemainingAmountNis(purchase, payments) : maxAmountNis),
    [purchase, payments, maxAmountNis]
  );

  const amountNis = config.features.allowCustomPaymentAmount ? customAmountNis : maxAmountNis;

  const handleClose = useCallback(() => {
    setStep('payment-request');
    setInitiationMethod('');
    setCustomAmountNis('');
    setIdempotencyKey(crypto.randomUUID());
    setSelectedBuyerId(buyers[0]?.id ?? '');
    onClose();
  }, [buyers, onClose]);

  const handleSendPayment = useCallback(async () => {
    if (!purchase || !initiationMethod || !selectedBuyer) return;
    if (config.features.allowCustomPaymentAmount && !customAmountNis) return;

    try {
      await createPaymentMutation.mutateAsync({
        trustBuyerPurchaseId: purchase.id,
        buyerPartyId: selectedBuyer.id,
        amountNis,
        initiationMethod,
        idempotencyKey
      });
      setStep('payment-sent');
    } catch {
      // Error is surfaced via createPaymentMutation.error → saveError prop
      setIdempotencyKey(crypto.randomUUID());
    }
  }, [
    purchase,
    initiationMethod,
    selectedBuyer,
    customAmountNis,
    amountNis,
    idempotencyKey,
    createPaymentMutation
  ]);

  const isNextDisabled = isPaymentNextDisabled({
    initiationMethod,
    allowCustomAmount: config.features.allowCustomPaymentAmount,
    customAmountNis,
    remainingAmountNis
  });

  const buyerOptions = buyers.map(b => ({id: b.id, fullName: b.fullName}));

  return (
    <>
      <BuyersModal
        isOpen={isOpen && step === 'payment-request'}
        onOpenChange={open => {
          if (!open) handleClose();
        }}
        activeTab="payment-request"
        isBuyerCreated={true}
        hideBuyerStep
        nextLabel={t('view.buyers.addBuyerModal.footer.sendPaymentRequest')}
        nextDisabled={isNextDisabled}
        nextIsLoading={createPaymentMutation.isPending}
        backLabel={t('view.buyers.addBuyerModal.footer.back')}
        onNextClick={handleSendPayment}
        onBackClick={handleClose}
      >
        <PaymentRequestTabContent
          amountNis={amountNis}
          onAmountChange={setCustomAmountNis}
          maxAmountNis={maxAmountNis}
          remainingAmountNis={remainingAmountNis}
          unitLabel={unitLabel}
          buyers={buyerOptions}
          selectedBuyerId={selectedBuyerId}
          onBuyerChange={setSelectedBuyerId}
          initiationMethod={initiationMethod}
          onInitiationMethodChange={setInitiationMethod}
          saveError={createPaymentMutation.error}
        />
      </BuyersModal>

      {purchase && initiationMethod && selectedBuyer && (
        <PaymentSentModal
          isOpen={step === 'payment-sent'}
          buyerName={selectedBuyer.fullName}
          unitLabel={unitLabel!}
          purchasePriceNis={purchase.purchasePriceNis}
          initiationMethod={initiationMethod}
          amountNis={amountNis}
          onClose={handleClose}
        />
      )}
    </>
  );
};
