import {Button, Icon, Modal} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

export interface BuyerSuccessPromptModalProps {
  isOpen: boolean;
  buyerName: string;
  onContinueToPayment: () => void;
  onBackToBuyers: () => void;
}

export const BuyerSuccessPromptModal: FC<BuyerSuccessPromptModalProps> = ({
  isOpen,
  buyerName,
  onContinueToPayment,
  onBackToBuyers
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={open => {
        if (!open) onBackToBuyers();
      }}
      title={t('view.buyers.successPrompt.title')}
      description={
        <span>
          {t('view.buyers.successPrompt.description1')}
          <br />
          {t('view.buyers.successPrompt.description2', {buyerName})}
        </span>
      }
      illustration={<Icon name="sollapay:celebration" width={80} height={80} />}
      showCloseButton={false}
      footer={
        <div className="-mx-6 flex flex-1 flex-col border-t border-border">
          <div className="flex items-center gap-3 px-6 pt-4">
            <Button variant="secondary" size="stretch" onClick={onBackToBuyers}>
              {t('view.buyers.successPrompt.backToBuyers')}
            </Button>
            <Button
              variant="primary"
              icon={<Icon name="arrow-narrow-left" width={20} height={20} />}
              iconPosition="end"
              onClick={onContinueToPayment}
            >
              {t('view.buyers.successPrompt.continueToPayment')}
            </Button>
          </div>
        </div>
      }
    />
  );
};
