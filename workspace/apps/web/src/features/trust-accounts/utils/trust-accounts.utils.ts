import {TrustStatus} from '@sollapay/enums';
import {Money} from '@sollapay/utils';

import {TRUST_PURPOSE_CONFIG} from '../config';

import type {TrustPurpose} from '@sollapay/enums';
import type {TrustAccountListLedgerDTO} from '@sollapay/types';
import type {TFunction} from 'i18next';

export const getAccountBalanceAmount = (
  accountId: string,
  trustStatus: TrustStatus,
  balancesMap?: Record<string, TrustAccountListLedgerDTO>
): number | null => {
  if (trustStatus !== TrustStatus.TRUST_ACTIVE) return null;
  const b = balancesMap?.[accountId]?.balance;
  return b != null ? Money.from(b).toNumber() : null;
};

export const displayOrNA = (value: string | null | undefined, t: TFunction): string =>
  value || t('common:na');

export const getTrustTypeLabel = (
  trustPurpose: TrustPurpose | null | undefined,
  t: TFunction
): string | undefined => {
  if (!trustPurpose) return undefined;
  return t(TRUST_PURPOSE_CONFIG[trustPurpose].labelKey);
};
