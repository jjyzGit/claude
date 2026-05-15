import {parseMoney} from '@sollapay/utils';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {config} from '@/app/app.config';
import {REQUIRED_DEPOSIT_PERCENTAGE} from '@/features/buyers/constants/buyers.constants';
import {
  useCreateBuyerForm,
  useCreatePaymentInstructionMutation,
  usePurchaseBuyers
} from '@/features/buyers/hooks';
import {formatUnitLabel, isPaymentNextDisabled} from '@/features/buyers/utils';

import {BuyersModal} from './BuyersModal';
import {CreateBuyerTabContent} from './BuyersModal/create-buyer/CreateBuyerTabContent';
import {PaymentRequestTabContent} from './BuyersModal/payment-request/PaymentRequestTabContent';
import {BuyerSuccessPromptModal} from './BuyerSuccessPromptModal';
import {PaymentSentModal} from './PaymentSentModal';

import type {InitiationMethod} from '@sollapay/enums';
import type {BuyerDTO} from '@sollapay/types';
import type {FC, ReactNode} from 'react';

type FlowStep = 'idle' | 'add-buyer' | 'success-prompt' | 'payment-request' | 'payment-sent';

export interface AddBuyerFlowProps {
  trustAccountId: string;
  trigger: (onOpen: () => void) => ReactNode;
}

export const AddBuyerFlow: FC<AddBuyerFlowProps> = ({trustAccountId, trigger}) => {
  const {t} = useTranslation('trustAccounts');
  const [flowStep, setFlowStep] = useState<FlowStep>('idle');
  const [createdBuyer, setCreatedBuyer] = useState<BuyerDTO | null>(null);
  const [initiationMethod, setInitiationMethod] = useState<InitiationMethod | ''>('');
  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const [uploadedDocumentIds, setUploadedDocumentIds] = useState<string[]>([]);
  const [customAmountNis, setCustomAmountNis] = useState('');
  const [selectedBuyerId, setSelectedBuyerId] = useState('');

  const {buyers: purchaseBuyers} = usePurchaseBuyers(
    trustAccountId,
    createdBuyer?.purchases[0]?.id,
    createdBuyer?.id
  );
  const paymentBuyerOptions =
    purchaseBuyers.length > 0
      ? purchaseBuyers.map(b => ({id: b.id, fullName: b.fullName}))
      : createdBuyer
        ? [{id: createdBuyer.id, fullName: createdBuyer.fullName}]
        : [];
  const effectiveBuyerId = selectedBuyerId || (createdBuyer?.id ?? '');
  const selectedBuyerForPayment =
    purchaseBuyers.find(b => b.id === effectiveBuyerId) ?? createdBuyer;

  const {
    form,
    handleSave,
    handleCancel: handleCancelWithAI,
    saveError,
    isSaving,
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified
  } = useCreateBuyerForm({
    trustAccountId,
    uploadedDocumentIds,
    onSuccess: (buyer: BuyerDTO) => {
      setCreatedBuyer(buyer);
      setFlowStep('success-prompt');
    }
  });

  const createPaymentMutation = useCreatePaymentInstructionMutation(trustAccountId);

  const resetFlow = useCallback(() => {
    setFlowStep('idle');
    setCreatedBuyer(null);
    setInitiationMethod('');
    setIdempotencyKey('');
    setUploadedDocumentIds([]);
    setCustomAmountNis('');
    setSelectedBuyerId('');
    handleCancelWithAI();
  }, [handleCancelWithAI]);

  const handleOpenAddBuyer = useCallback(() => {
    setFlowStep('add-buyer');
  }, []);

  const handleContinueToPayment = () => {
    setIdempotencyKey(crypto.randomUUID());
    setSelectedBuyerId(createdBuyer?.id ?? '');
    setFlowStep('payment-request');
  };

  const handleSendPaymentRequest = async () => {
    const purchase = createdBuyer?.purchases[0];
    if (!purchase || !initiationMethod || !idempotencyKey) return;

    try {
      await createPaymentMutation.mutateAsync({
        trustBuyerPurchaseId: purchase.id,
        buyerPartyId: effectiveBuyerId,
        amountNis,
        initiationMethod,
        idempotencyKey
      });
      setFlowStep('payment-sent');
    } catch {
      // Error surfaced via createPaymentMutation.error → saveError prop
      // Regenerate key so a retry doesn't reuse a potentially consumed key
      setIdempotencyKey(crypto.randomUUID());
    }
  };

  const maxAmountNis = createdBuyer?.purchases[0]
    ? parseMoney(createdBuyer.purchases[0].purchasePriceNis)
        .percentOf(REQUIRED_DEPOSIT_PERCENTAGE)
        .toString()
    : '0';

  // New buyer has no prior payments, so remaining = max
  const amountNis = config.features.allowCustomPaymentAmount ? customAmountNis : maxAmountNis;

  // New buyer: remaining = max (no prior payments)
  const isNextDisabled = isPaymentNextDisabled({
    initiationMethod,
    allowCustomAmount: config.features.allowCustomPaymentAmount,
    customAmountNis,
    remainingAmountNis: maxAmountNis
  });

  return (
    <>
      {trigger(handleOpenAddBuyer)}

      {/* Screen 1 — Add Buyer Modal */}
      <BuyersModal
        isOpen={flowStep === 'add-buyer'}
        onOpenChange={open => {
          if (!open && flowStep === 'add-buyer') resetFlow();
        }}
        activeTab="create-buyer"
        isBuyerCreated={false}
        nextLabel={t('view.buyers.addBuyerModal.footer.addBuyer')}
        nextIsLoading={isSaving}
        backLabel={t('view.buyers.addBuyerModal.footer.back')}
        onNextClick={handleSave}
        onBackClick={resetFlow}
      >
        <CreateBuyerTabContent
          trustAccountId={trustAccountId}
          form={form}
          onDocumentsChange={setUploadedDocumentIds}
          saveError={saveError}
          aiFields={aiFields}
          isProcessing={isProcessing}
          suggestionsCount={suggestionsCount}
          markFieldModified={markFieldModified}
        />
      </BuyersModal>

      {/* Screen 2 — Success Prompt */}
      <BuyerSuccessPromptModal
        isOpen={flowStep === 'success-prompt'}
        buyerName={createdBuyer?.fullName ?? ''}
        onContinueToPayment={handleContinueToPayment}
        onBackToBuyers={resetFlow}
      />

      {/* Screen 3 — Payment Request Modal */}
      <BuyersModal
        isOpen={flowStep === 'payment-request'}
        onOpenChange={open => {
          if (!open && flowStep === 'payment-request') resetFlow();
        }}
        activeTab="payment-request"
        isBuyerCreated={true}
        nextLabel={t('view.buyers.addBuyerModal.footer.sendPaymentRequest')}
        nextDisabled={isNextDisabled}
        backLabel={t('view.buyers.addBuyerModal.footer.back')}
        nextIsLoading={createPaymentMutation.isPending}
        onNextClick={handleSendPaymentRequest}
        onBackClick={resetFlow}
      >
        <PaymentRequestTabContent
          amountNis={amountNis}
          onAmountChange={setCustomAmountNis}
          maxAmountNis={maxAmountNis}
          remainingAmountNis={maxAmountNis}
          unitLabel={
            createdBuyer?.purchases[0]
              ? formatUnitLabel(createdBuyer.purchases[0].unit, t)
              : undefined
          }
          buyers={paymentBuyerOptions}
          selectedBuyerId={effectiveBuyerId}
          onBuyerChange={setSelectedBuyerId}
          initiationMethod={initiationMethod}
          onInitiationMethodChange={setInitiationMethod}
          saveError={createPaymentMutation.error}
        />
      </BuyersModal>

      {/* Payment Sent Confirmation */}
      {createdBuyer?.purchases[0] && initiationMethod && (
        <PaymentSentModal
          isOpen={flowStep === 'payment-sent'}
          buyerName={selectedBuyerForPayment?.fullName ?? ''}
          unitLabel={formatUnitLabel(createdBuyer.purchases[0].unit, t)}
          purchasePriceNis={createdBuyer.purchases[0].purchasePriceNis}
          initiationMethod={initiationMethod}
          amountNis={amountNis}
          onClose={resetFlow}
        />
      )}
    </>
  );
};
