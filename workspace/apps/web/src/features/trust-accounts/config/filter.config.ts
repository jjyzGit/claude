import {TrustPurpose, TrustStatus} from '@sollapay/enums';

import type {TrustAccountCreatedAtFilter, TrustAccountFilterState} from '../utils/filter.utils';

export const DEFAULT_FILTER_STATE: TrustAccountFilterState = {
  statuses: [],
  purposes: [],
  createdAt: 'all'
};

export const TRUST_STATUS_FILTER_OPTIONS: ReadonlyArray<{
  value: TrustStatus;
  i18nKey: string;
}> = [
  {value: TrustStatus.SETUP_IN_PROGRESS, i18nKey: 'statuses.setupInProgress'},
  {value: TrustStatus.PENDING_VALIDATION, i18nKey: 'statuses.pendingValidation'},
  {value: TrustStatus.IN_REVIEW, i18nKey: 'statuses.inReview'},
  {value: TrustStatus.CLARIFICATION_REQUIRED, i18nKey: 'statuses.clarificationRequired'},
  {value: TrustStatus.ACTIVATION_PENDING, i18nKey: 'statuses.activationPending'},
  {value: TrustStatus.TRUST_ACTIVE, i18nKey: 'statuses.trustActive'}
];

export const TRUST_PURPOSE_FILTER_OPTIONS: ReadonlyArray<{
  value: TrustPurpose;
  i18nKey: string;
}> = [
  {value: TrustPurpose.SEVEN_PERCENT, i18nKey: 'trustPurposes.sevenPercent'},
  {value: TrustPurpose.OPTIONS, i18nKey: 'trustPurposes.options'}
];

export const CREATED_AT_FILTER_OPTIONS: ReadonlyArray<{
  value: TrustAccountCreatedAtFilter;
  i18nKey: string;
}> = [
  {value: 'all', i18nKey: 'filter.createdAt.all'},
  {value: '7d', i18nKey: 'filter.createdAt.last7days'},
  {value: '30d', i18nKey: 'filter.createdAt.last30days'},
  {value: '90d', i18nKey: 'filter.createdAt.last90days'}
];
