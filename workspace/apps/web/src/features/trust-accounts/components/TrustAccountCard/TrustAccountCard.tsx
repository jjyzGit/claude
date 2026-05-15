import {TrustStatus} from '@sollapay/enums';
import {
  Card,
  CardBody,
  CardCell,
  CardFooter,
  CardHeader,
  CardHeaderContent,
  InfoRow,
  Typography
} from '@sollapay/ui/components';
import {cn} from '@sollapay/ui/lib';
import {formatDateLocalized} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import {displayOrNA} from '../../utils';
import {TrustAccountActionButton} from '../TrustAccountActionButton';
import {TrustAccountAvatar} from '../TrustAccountAvatar';
import {TrustAccountBadge} from '../TrustAccountBadge';
import {TrustAccountBalanceChip} from '../TrustAccountBalanceChip';
import {TrustAccountMoreMenu} from '../TrustAccountMoreMenu';

import type {TrustPurpose} from '@sollapay/enums';
import type {TrustAccountListItemDTO, TrustAccountListLedgerDTO} from '@sollapay/types';

type TrustAccountCardStatus = TrustStatus;

export interface TrustAccountCardProps {
  refId: string;
  name: string;
  trustPurpose?: TrustPurpose;
  trustType: string;
  date: Date;
  status: TrustAccountCardStatus;
  developerName: string | null;
  balance?: TrustAccountListLedgerDTO | null;
  account: TrustAccountListItemDTO;
  onEditAccount: (account: TrustAccountListItemDTO) => void;
  onDeleteAccount: (account: TrustAccountListItemDTO) => void;
  onActionClick: () => void;
  onCardClick?: () => void;
  className?: string;
}

export function TrustAccountCard({
  refId,
  name,
  trustPurpose,
  trustType,
  date,
  status,
  developerName,
  balance,
  account,
  onEditAccount,
  onDeleteAccount,
  onActionClick,
  onCardClick,
  className
}: TrustAccountCardProps) {
  const {t, i18n} = useTranslation('trustAccounts');

  return (
    <Card
      className={cn(
        'transition-colors duration-300 ease-in-out hover:border-brand-primary focus-within:border-brand-primary',
        className
      )}
      onCardClick={onCardClick}
    >
      <CardHeader>
        <CardHeaderContent>
          <TrustAccountAvatar name={name} trustPurpose={trustPurpose} />
          <div className="min-w-0">
            <Typography as="h3" size="sm" weight="medium" color="default">
              {name}
            </Typography>
            <Typography size="xs" color="tertiary">
              {t('activation.refIdTooltip', {refId})}
            </Typography>
          </div>
        </CardHeaderContent>
        {account.trustStatus === TrustStatus.SETUP_IN_PROGRESS && (
          <div
            role="presentation"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          >
            <TrustAccountMoreMenu
              actions={['edit', 'delete']}
              onEdit={() => onEditAccount(account)}
              onDelete={() => onDeleteAccount(account)}
              orientation="vertical"
            />
          </div>
        )}
      </CardHeader>

      <CardBody className="flex flex-col flex-1 gap-3">
        <div className="flex flex-col gap-1">
          <Typography size="xs" color="tertiary">
            {t('card.balance')}
          </Typography>
          <TrustAccountBalanceChip status={status} balance={balance?.balance} size="md" />
        </div>

        <div className="grid grid-cols-2 gap-y-4">
          <CardCell>
            <InfoRow label={t('card.type')} value={trustType} layout="vertical" />
          </CardCell>

          <CardCell>
            <Typography size="xs" color="tertiary">
              {t('status')}
            </Typography>
            <div className="mt-1">
              <TrustAccountBadge status={status} />
            </div>
          </CardCell>

          <CardCell>
            <InfoRow
              label={t('card.date')}
              value={formatDateLocalized(date, i18n.language)}
              layout="vertical"
            />
          </CardCell>

          <CardCell>
            <InfoRow
              label={t('card.developer')}
              value={displayOrNA(developerName, t)}
              layout="vertical"
            />
          </CardCell>
        </div>
      </CardBody>

      <CardFooter onClick={e => e.stopPropagation()}>
        <TrustAccountActionButton status={status} onClick={onActionClick} className="w-full" />
      </CardFooter>
    </Card>
  );
}

export type {TrustAccountCardStatus};
