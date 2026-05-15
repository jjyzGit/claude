import {Avatar, IconBox} from '@sollapay/ui/components';

import {TRUST_PURPOSE_CONFIG} from '../config';

import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {FC} from 'react';

interface TrustAccountAvatarProps {
  name: TrustAccountListItemDTO['name'];
  trustPurpose: TrustAccountListItemDTO['trustPurpose'];
}

export const TrustAccountAvatar: FC<TrustAccountAvatarProps> = ({name, trustPurpose}) => {
  const icon = trustPurpose ? TRUST_PURPOSE_CONFIG[trustPurpose].icon : null;

  if (icon) {
    return <IconBox icon={icon} variant="secondary" className="relative overflow-hidden" />;
  }

  return <Avatar initials={name.slice(0, 2).toUpperCase()} shape="square" size="lg" noShadow />;
};
