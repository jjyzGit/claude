import {PackageStatus} from '@sollapay/enums';

import type {PackageReadiness} from '@sollapay/types';

export type ActivationPackageRowAction = 'start' | 'edit' | 'view' | null;

export function getStatusLabelKey(
  status: PackageStatus,
  canEdit: boolean,
  canSubmit: boolean,
  readiness: PackageReadiness,
  isSubmittedForReview: boolean
): string | null {
  const {totalCount, missingCount} = readiness;

  if (status === PackageStatus.SUBMITTED) {
    return isSubmittedForReview
      ? 'activation.packageStatus.pendingReview'
      : 'activation.packageStatus.submitted';
  }
  if (status === PackageStatus.APPROVED) {
    return 'activation.packageStatus.approved';
  }
  if (status === PackageStatus.IN_REVIEW) {
    return 'activation.packageStatus.inReview';
  }
  if (status === PackageStatus.CLARIFICATION_REQUIRED) {
    return 'activation.packageStatus.clarificationRequired';
  }
  if (missingCount !== 0 && missingCount < totalCount) {
    return 'activation.packageStatus.partiallyFilled';
  }
  if (canSubmit) {
    return 'activation.packageStatus.readyToSubmit';
  }
  if (canEdit) {
    return 'activation.packageStatus.notSubmitted';
  }

  return null;
}

export function getAction(
  status: PackageStatus,
  canEdit: boolean,
  readiness: PackageReadiness,
  isSubmittedForReview = false
): ActivationPackageRowAction {
  if (isSubmittedForReview) return 'view';
  if (
    status === PackageStatus.SUBMITTED ||
    status === PackageStatus.IN_REVIEW ||
    status === PackageStatus.APPROVED
  ) {
    return null;
  }
  if (!canEdit) return null;
  const isEmpty = readiness.totalCount === 0 || readiness.missingCount === readiness.totalCount;
  return isEmpty ? 'start' : 'edit';
}

export function isDimmed(status: PackageStatus): boolean {
  return (
    status === PackageStatus.SUBMITTED ||
    status === PackageStatus.IN_REVIEW ||
    status === PackageStatus.APPROVED
  );
}

/** The user can still open and edit this package. */
export function isPackageActionable(pkg: {canEdit: boolean}): boolean {
  return pkg.canEdit;
}

/** The user has made some progress — at least one field filled but not all. */
export function isPackageInProgress(pkg: {canEdit: boolean; readiness: PackageReadiness}): boolean {
  return (
    pkg.canEdit &&
    pkg.readiness.totalCount > 0 &&
    pkg.readiness.missingCount < pkg.readiness.totalCount
  );
}
