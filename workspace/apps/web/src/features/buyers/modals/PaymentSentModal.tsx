import {InitiationMethod} from '@sollapay/enums';
import {Button, Illustration, InfoRow, Modal, Typography} from '@sollapay/ui/components';
import {SaveMoneyIllustration} from '@sollapay/ui/illustrations';
import {formatNIS, parseMoney} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

function computeActualPercent(amountNis: string, purchasePriceNis: string): number {
  const price = parseMoney(purchasePriceNis).toNumber();
  if (price <= 0) return 0;
  const pct = (parseMoney(amountNis).toNumber() / price) * 100;
  return Math.round(pct * 100) / 100;
}

export interface PaymentSentModalProps {
  isOpen: boolean;
  buyerName: string;
  unitLabel: string;
  purchasePriceNis: string;
  initiationMethod: InitiationMethod;
  amountNis: string;
  onClose: () => void;
}

export const PaymentSentModal: FC<PaymentSentModalProps> = ({
  isOpen,
  buyerName,
  unitLabel,
  purchasePriceNis,
  initiationMethod,
  amountNis,
  onClose
}) => {
  const {t} = useTranslation('trustAccounts');
  const prefix = 'view.buyers.paymentSent';
  const methodPrefix = 'view.buyers.paymentRequest.methods';

  const isRtp = initiationMethod === InitiationMethod.RTP;

  const actualPercent = computeActualPercent(amountNis, purchasePriceNis);

  const methodLabel = isRtp
    ? t(`${methodPrefix}.rtp`)
    : t(`${methodPrefix}.manual_branch_transfer`);

  const description = isRtp ? t(`${prefix}.descriptionRtp`) : t(`${prefix}.descriptionManual`);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      title={t(`${prefix}.title`, {buyerName})}
      description={description}
      illustration={
        <Illustration width={91} height={71}>
          <SaveMoneyIllustration />
        </Illustration>
      }
      showCloseButton={false}
      footer={
        <div className="-mx-6 flex flex-1 flex-col border-t border-border">
          <div className="flex items-center gap-3 px-6 pt-4">
            <Button variant="primary" size="stretch" onClick={onClose}>
              {t(`${prefix}.cta`)}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3 rounded-md border border-border-subtle bg-background-secondary p-4 py-3">
        <Typography size="sm" weight="semibold" className="text-start">
          {t(`${prefix}.summaryTitle`)}
        </Typography>
        <div className="flex flex-col gap-3">
          <InfoRow label={t(`${prefix}.buyer`)} value={buyerName} />
          <InfoRow label={t(`${prefix}.unit`)} value={unitLabel} />
          <InfoRow
            label={t(`${prefix}.purchasePrice`)}
            value={formatNIS(parseMoney(purchasePriceNis))}
          />
          <InfoRow label={t(`${prefix}.paymentMethod`)} value={methodLabel} />
          <InfoRow
            label={t(`${prefix}.requestAmount`, {percent: actualPercent})}
            value={formatNIS(parseMoney(amountNis))}
          />
        </div>
      </div>
    </Modal>
  );
};
