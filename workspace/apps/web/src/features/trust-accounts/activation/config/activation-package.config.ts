import {PackageType} from '@sollapay/enums';

import type {IconName} from '@sollapay/ui/components';

export type ActivationPackageConfig = {
  order: number;
  isOptional: boolean;
  path: string;
  icon: IconName;
  titleKey: string;
  descriptionKey: string;
};

export const ACTIVATION_PACKAGE_CONFIG: Record<PackageType, ActivationPackageConfig> = {
  [PackageType.TRUST_DETAILS]: {
    order: 0,
    isOptional: false,
    path: 'details',
    icon: 'sollapay:trust-details',
    titleKey: 'activation.packages.trustDetails.title',
    descriptionKey: 'activation.packages.trustDetails.description'
  },
  [PackageType.COMPLIANCE]: {
    order: 1,
    isOptional: false,
    path: 'compliance',
    icon: 'sollapay:compliance',
    titleKey: 'activation.packages.compliance.title',
    descriptionKey: 'activation.packages.compliance.description'
  },
  [PackageType.KYC]: {
    order: 2,
    isOptional: true,
    path: 'kyc',
    icon: 'sollapay:kyc',
    titleKey: 'activation.packages.kyc.title',
    descriptionKey: 'activation.packages.kyc.description'
  }
};

export const ACTIVATION_SORTED_PACKAGE_TYPES = Object.entries(ACTIVATION_PACKAGE_CONFIG)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([packageType]) => packageType as PackageType);
