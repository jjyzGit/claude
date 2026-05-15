import {Button, ContentSection, EmptyState, Icon, Illustration} from '@sollapay/ui/components';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import {BuyerPaymentHistoryTable} from './BuyerPaymentHistoryTable';

import type {PaymentInstructionDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerPaymentHistorySectionProps {
  instructions: PaymentInstructionDTO[];
  unitLabel: string;
  onRequestPayment?: () => void;
  requestPaymentDisabled?: boolean;
}

export const BuyerPaymentHistorySection: FC<BuyerPaymentHistorySectionProps> = ({
  instructions,
  unitLabel,
  onRequestPayment,
  requestPaymentDisabled = false
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <ContentSection
      title={t('view.buyers.detail.paymentHistory')}
      action={
        onRequestPayment && !requestPaymentDisabled ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onRequestPayment}
            icon={<Icon name="send" className="-scale-x-100" />}
            iconPosition="end"
          >
            {t('view.buyers.detail.actions.sendPaymentRequest')}
          </Button>
        ) : undefined
      }
    >
      <BuyerPaymentHistoryTable
        instructions={instructions}
        emptyState={
          <EmptyState
            className="py-8"
            illustration={
              <Illustration width={64} height={50}>
                <SearchIllustration />
              </Illustration>
            }
            title={t('view.buyers.detail.emptyPayments.title')}
            subtitle={t('view.buyers.detail.emptyPayments.description', {
              unit: unitLabel
            })}
          />
        }
      />
    </ContentSection>
  );
};
