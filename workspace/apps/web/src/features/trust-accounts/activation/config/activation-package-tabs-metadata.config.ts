import {PackageType} from '@sollapay/enums';

import type {IconName} from '@sollapay/ui/components';

export enum TrustDetailsStep {
  TRUST_SCOPE = 'trust-scope',
  DEVELOPER_DETAILS = 'developer-details'
}

export enum ComplianceStep {
  SUPPORTING_DOCUMENTS = 'supporting-documents',
  RESIDENCY_STATUS = 'residency-status'
}

export type StepMetadata = {
  labelKey: string;
};

export type StepsMap = Record<string, StepMetadata>;

export const ACTIVATION_PACKAGE_TABS_METADATA: Record<
  PackageType,
  {icon: IconName; labelKey: string; items: StepsMap; comingSoon?: boolean}
> = {
  [PackageType.TRUST_DETAILS]: {
    icon: 'sollapay:trust-details',
    labelKey: 'activation.packageFormModal.tabs.trustDetails',
    items: {
      [TrustDetailsStep.TRUST_SCOPE]: {
        labelKey: 'activation.packageFormModal.steps.trustScope'
      },
      [TrustDetailsStep.DEVELOPER_DETAILS]: {
        labelKey: 'activation.packageFormModal.steps.developerDetails'
      }
    }
  },
  [PackageType.COMPLIANCE]: {
    icon: 'sollapay:compliance',
    labelKey: 'activation.packageFormModal.tabs.compliance',
    items: {
      [ComplianceStep.SUPPORTING_DOCUMENTS]: {
        labelKey: 'activation.packageFormModal.steps.supportingDocuments'
      },
      [ComplianceStep.RESIDENCY_STATUS]: {
        labelKey: 'activation.packageFormModal.steps.residencyStatus'
      }
    }
  },
  [PackageType.KYC]: {
    icon: 'sollapay:kyc',
    labelKey: 'activation.packageFormModal.tabs.kyc',
    items: {},
    comingSoon: true
  }
};

export const ACTIVATION_PACKAGE_CANCEL_BUTTON_METADATA = {
  labelKey: 'activation.packageFormModal.cancel',
  isDestructive: true
} as const;

export const ACTIVATION_PACKAGE_SAVE_BUTTON_METADATA = {
  labelKey: 'activation.packageFormModal.save'
} as const;
