import {ModalTabIconLabel, MultiStepsModal} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {TabItem} from '@sollapay/ui/components';
import type {FC, ReactNode} from 'react';

export type BuyersModalTab = 'create-buyer' | 'payment-request';

export interface BuyersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: BuyersModalTab;
  isBuyerCreated: boolean;
  /** When true, hides the create-buyer tab. Use when the modal is not part of a buyer creation flow. */
  hideBuyerStep?: boolean;
  nextLabel: string;
  nextDisabled?: boolean;
  nextIsLoading?: boolean;
  backLabel: string;
  onNextClick: () => void;
  onBackClick: () => void;
  children: ReactNode;
}

export const BuyersModal: FC<BuyersModalProps> = ({
  isOpen,
  onOpenChange,
  activeTab,
  isBuyerCreated,
  hideBuyerStep = false,
  nextLabel,
  nextDisabled,
  nextIsLoading,
  backLabel,
  onNextClick,
  onBackClick,
  children
}) => {
  const {t} = useTranslation('trustAccounts');

  const paymentRequestTab: TabItem = {
    value: 'payment-request',
    label: (
      <ModalTabIconLabel
        icon="sollapay:initiate-payment"
        text={t('view.buyers.tab.paymentRequest')}
        disabled={!isBuyerCreated}
      />
    ),
    disabled: !isBuyerCreated
  };

  const tabs: TabItem[] = hideBuyerStep
    ? [paymentRequestTab]
    : [
        {
          value: 'create-buyer',
          label: (
            <ModalTabIconLabel
              icon="sollapay:add-buyer"
              text={t('view.buyers.tab.createBuyer')}
              completed={isBuyerCreated}
            />
          ),
          disabled: isBuyerCreated && activeTab === 'payment-request'
        },
        paymentRequestTab
      ];

  return (
    <MultiStepsModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={t('view.buyers.addBuyerModal.title')}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={() => {}}
      nextLabel={nextLabel}
      nextDisabled={nextDisabled}
      nextIsLoading={nextIsLoading}
      backLabel={backLabel}
      onNextClick={onNextClick}
      onBackClick={activeTab === 'payment-request' && !hideBuyerStep ? undefined : onBackClick}
    >
      {children}
    </MultiStepsModal>
  );
};
