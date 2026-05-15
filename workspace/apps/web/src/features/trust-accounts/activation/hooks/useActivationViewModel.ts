import {ActivationStatus, PackageStatus, TrustStatus} from '@sollapay/enums';

import {useTrustAccountQuery} from '@/features/trust-accounts/hooks';

import {ACTIVATION_SORTED_PACKAGE_TYPES} from '../config';

import type {PackageType} from '@sollapay/enums';
import type {
  ClarificationRequest,
  PackageReadiness,
  TrustAccountSkeletonDraftDTO
} from '@sollapay/types';

const DEFAULT_READINESS: PackageReadiness = {
  isReady: false,
  totalCount: 0,
  missingCount: 0,
  missing: []
};

export type ActivationPackageViewModel = {
  type: PackageType;
  status: PackageStatus;
  canEdit: boolean;
  canSubmit: boolean;
  readiness: PackageReadiness;
  clarificationRequests: ClarificationRequest[] | null;
};

export type ActivationViewModel = {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  trustAccount: TrustAccountSkeletonDraftDTO | undefined;
  packages: ActivationPackageViewModel[];
  canSendPackages: boolean;
  isSubmittedForReview: boolean;
  isTrustActive: boolean;
};

/**
 * Derives all activation page state from server data.
 * Packages are pre-sorted by canonical order from `ACTIVATION_SORTED_PACKAGE_TYPES`.
 * Falls back to full order with NOT_SUBMITTED defaults when no server packages are present.
 */
export function useActivationViewModel(id: string): ActivationViewModel {
  const {data, isLoading, isError, refetch} = useTrustAccountQuery(id);

  const packages: ActivationPackageViewModel[] = data?.packages?.length
    ? [...data.packages]
        .sort(
          (a, b) =>
            ACTIVATION_SORTED_PACKAGE_TYPES.indexOf(a.type) -
            ACTIVATION_SORTED_PACKAGE_TYPES.indexOf(b.type)
        )
        .map(({type, status, canEdit, canSubmit, readiness, clarificationRequests}) => ({
          type,
          status,
          canEdit,
          canSubmit,
          readiness,
          clarificationRequests
        }))
    : ACTIVATION_SORTED_PACKAGE_TYPES.map(type => ({
        type,
        status: PackageStatus.NOT_SUBMITTED,
        canEdit: false,
        canSubmit: false,
        readiness: DEFAULT_READINESS,
        clarificationRequests: null
      }));

  return {
    isLoading,
    isError,
    refetch,
    trustAccount: data?.trustAccount,
    packages,
    canSendPackages: data?.actions.canTriggerActivation ?? false,
    isSubmittedForReview:
      data?.trustAccount.activationStatus === ActivationStatus.SUBMITTED_FOR_REVIEW,
    isTrustActive: data?.trustAccount.trustStatus === TrustStatus.TRUST_ACTIVE
  };
}
