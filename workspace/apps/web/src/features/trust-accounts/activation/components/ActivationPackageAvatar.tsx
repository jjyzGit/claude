import {IconBox} from '@sollapay/ui/components';

import {ACTIVATION_PACKAGE_CONFIG} from '../config';

import type {PackageType} from '@sollapay/enums';
import type {FC} from 'react';

interface ActivationPackageAvatarProps {
  type: PackageType;
  isDimmed?: boolean;
}

export const ActivationPackageAvatar: FC<ActivationPackageAvatarProps> = ({
  type,
  isDimmed = false
}) => {
  const iconName = ACTIVATION_PACKAGE_CONFIG[type].icon;

  return (
    <IconBox
      icon={iconName}
      variant="secondary"
      className="relative overflow-hidden"
      iconClassName={isDimmed ? 'opacity-30' : undefined}
    />
  );
};
