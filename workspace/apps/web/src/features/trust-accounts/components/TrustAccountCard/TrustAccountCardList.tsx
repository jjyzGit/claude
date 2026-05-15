import {useTranslation} from 'react-i18next';

import {TrustAccountCard} from './TrustAccountCard';
import {displayOrNA, getTrustTypeLabel} from '../../utils';

import type {TrustAccountListItemDTO, TrustAccountListLedgerDTO} from '@sollapay/types';

interface TrustAccountCardListProps {
  accounts: TrustAccountListItemDTO[];
  balancesMap?: Record<string, TrustAccountListLedgerDTO>;
  onEditAccount?: (account: TrustAccountListItemDTO) => void;
  onDeleteAccount?: (account: TrustAccountListItemDTO) => void;
  onAccountActionClick?: (account: TrustAccountListItemDTO) => void;
  onCardClick?: (account: TrustAccountListItemDTO) => void;
}

export function TrustAccountCardList({
  accounts,
  balancesMap,
  onEditAccount,
  onDeleteAccount,
  onAccountActionClick,
  onCardClick
}: TrustAccountCardListProps) {
  const {t} = useTranslation(['trustAccounts', 'common']);

  return (
    <div data-slot="trust-account-card-list" className="grid grid-cols-3 gap-8 2xl:grid-cols-4">
      {accounts.map(account => (
        <TrustAccountCard
          key={account.id}
          account={account}
          refId={account.refId}
          name={account.name}
          trustPurpose={account.trustPurpose}
          trustType={displayOrNA(getTrustTypeLabel(account.trustPurpose, t), t)}
          date={new Date(account.createdAt)}
          status={account.trustStatus}
          developerName={account.developerName}
          balance={balancesMap?.[account.id] ?? null}
          onEditAccount={onEditAccount ?? (() => {})}
          onDeleteAccount={onDeleteAccount ?? (() => {})}
          onActionClick={() => onAccountActionClick?.(account)}
          onCardClick={onCardClick ? () => onCardClick(account) : undefined}
        />
      ))}
    </div>
  );
}

export type {TrustAccountCardListProps};
