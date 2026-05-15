import {TrustPurpose, TrustStatus} from '@sollapay/enums';

import type {IconName, badgeVariantsConfig} from '@sollapay/ui/components';

type BadgeVariant = keyof (typeof badgeVariantsConfig)['variants']['variant'];

export const TRUST_STATUS_CONFIG: Record<
  TrustStatus,
  {
    variant: BadgeVariant;
    dot: boolean;
    labelKey: string;
    subtitleKey: string | null;
  }
> = {
  [TrustStatus.TRUST_ACTIVE]: {
    variant: 'success',
    dot: true,
    labelKey: 'statuses.trustActive',
    subtitleKey: 'statuses.trustActiveSubtitle'
  },
  [TrustStatus.PENDING_VALIDATION]: {
    variant: 'warning',
    dot: true,
    labelKey: 'statuses.pendingValidation',
    subtitleKey: null
  },
  [TrustStatus.SETUP_IN_PROGRESS]: {
    variant: 'gray',
    dot: true,
    labelKey: 'statuses.setupInProgress',
    subtitleKey: null
  },
  [TrustStatus.IN_REVIEW]: {
    variant: 'info',
    dot: true,
    labelKey: 'statuses.inReview',
    subtitleKey: null
  },
  [TrustStatus.CLARIFICATION_REQUIRED]: {
    variant: 'error',
    dot: true,
    labelKey: 'statuses.clarificationRequired',
    subtitleKey: null
  },
  [TrustStatus.ACTIVATION_PENDING]: {
    variant: 'error',
    dot: true,
    labelKey: 'statuses.activationPending',
    subtitleKey: null
  }
};

export type TrustPurposeConfig = {
  labelKey: string;
  icon: IconName | null;
  comingSoon?: boolean;
};

export const TRUST_PURPOSE_CONFIG: Record<TrustPurpose, TrustPurposeConfig> = {
  [TrustPurpose.SEVEN_PERCENT]: {labelKey: 'trustPurposes.sevenPercent', icon: 'sollapay:building'},
  [TrustPurpose.OPTIONS]: {
    labelKey: 'trustPurposes.options',
    icon: 'sollapay:notebook',
    comingSoon: true
  }
};
