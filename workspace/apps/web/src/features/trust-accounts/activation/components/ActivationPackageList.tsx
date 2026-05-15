import {ActivationPackageRow} from './ActivationPackageRow';

import type {ActivationPackageConfig} from '../config';
import type {ActivationPackageViewModel} from '../hooks';
import type {PackageType} from '@sollapay/enums';
import type {FC} from 'react';

interface ActivationPackageListProps {
  packages: ActivationPackageViewModel[];
  packageConfig: Record<PackageType, ActivationPackageConfig>;
  onPackageNavigate: (type: PackageType) => void;
  isSubmittedForReview?: boolean;
  className?: string;
}

export const ActivationPackageList: FC<ActivationPackageListProps> = ({
  packages,
  onPackageNavigate,
  isSubmittedForReview = false,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col gap-4 pt-12 ${!isSubmittedForReview ? 'pb-32' : 'pb-6'} ${className}`}
      data-slot="activation-package-list"
    >
      {packages.map(pkg => (
        <ActivationPackageRow
          key={pkg.type}
          type={pkg.type}
          status={pkg.status}
          canEdit={pkg.canEdit}
          canSubmit={pkg.canSubmit}
          readiness={pkg.readiness}
          onNavigate={() => onPackageNavigate(pkg.type)}
          isSubmittedForReview={isSubmittedForReview}
        />
      ))}
    </div>
  );
};
