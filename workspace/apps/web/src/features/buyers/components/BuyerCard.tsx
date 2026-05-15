import {
  Avatar,
  Card,
  CardBody,
  CardCell,
  CardFooter,
  CardHeader,
  CardHeaderContent,
  InfoRow,
  Typography
} from '@sollapay/ui/components';
import {formatDateLocalized, formatNIS} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import {getInitials} from '@/utils/get-initials.utils';

import {formatBuyerDisplayName, formatUnitLabel} from '../utils';
import {BuyerActionButton} from './BuyerActionButton';
import {BuyerGroupBadge} from './BuyerGroupBadge';
import {BuyerMoreMenu} from './BuyerMoreMenu';
import {BuyerPaymentStatusBadge} from './BuyerPaymentStatusBadge';
import {BuyerRegulatoryReportsBadge} from './BuyerRegulatoryReportsBadge';

import type {BuyerTableRow} from '../types/buyers.types';
import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerCardProps {
  row: BuyerTableRow;
  onRequestPayment: (buyer: BuyerDTO) => void;
  onViewBuyer: (buyer: BuyerDTO) => void;
  trustAccountId: string;
}

export const BuyerCard: FC<BuyerCardProps> = ({
  row,
  onRequestPayment,
  onViewBuyer,
  trustAccountId
}) => {
  const {t, i18n} = useTranslation('trustAccounts');
  const {buyers, purchase, depositPaidNis, paymentStatus} = row;
  const primaryBuyer = buyers[0];
  const displayName = formatBuyerDisplayName(primaryBuyer.fullName);

  return (
    <Card
      className="transition-colors duration-300 ease-in-out hover:border-brand-primary"
      onCardClick={() => onViewBuyer(primaryBuyer)}
    >
      <CardHeader>
        <CardHeaderContent>
          <Avatar initials={getInitials(displayName)} size="lg" seed={primaryBuyer.id} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Typography as="h3" size="sm" weight="medium">
                {displayName}
              </Typography>
              {buyers.length > 1 && (
                <BuyerGroupBadge buyers={buyers.slice(1)} onViewBuyer={onViewBuyer} />
              )}
            </div>
            <Typography size="xs" color="tertiary">
              {formatUnitLabel(purchase.unit, t)}
            </Typography>
          </div>
        </CardHeaderContent>
        <div
          role="presentation"
          className="flex items-center gap-1"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
        >
          <BuyerRegulatoryReportsBadge purchase={purchase} trustAccountId={trustAccountId} />
          <BuyerMoreMenu
            actions={['view']}
            orientation="vertical"
            onView={() => onViewBuyer(primaryBuyer)}
          />
        </div>
      </CardHeader>

      <CardBody className="grid flex-1 grid-cols-2 gap-x-3 gap-y-4">
        <CardCell>
          <InfoRow
            label={t('view.buyers.list.columns.purchasePrice')}
            value={formatNIS(purchase.purchasePriceNis)}
            layout="vertical"
          />
        </CardCell>

        <CardCell>
          <InfoRow
            label={t('view.buyers.list.columns.depositPaid')}
            value={formatNIS(depositPaidNis)}
            layout="vertical"
          />
        </CardCell>

        <CardCell>
          <InfoRow
            label={t('view.buyers.list.columns.createdAt')}
            value={formatDateLocalized(primaryBuyer.createdAt, i18n.language)}
            layout="vertical"
          />
        </CardCell>

        <CardCell>
          <Typography size="xs" color="tertiary">
            {t('view.buyers.list.columns.paymentStatus')}
          </Typography>
          <div className="mt-1 flex flex-col items-start">
            <BuyerPaymentStatusBadge status={paymentStatus} />
          </div>
        </CardCell>
      </CardBody>

      <CardFooter
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <BuyerActionButton
          paymentStatus={paymentStatus}
          onRequestPayment={() => onRequestPayment(primaryBuyer)}
          onViewBuyer={() => onViewBuyer(primaryBuyer)}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
};
