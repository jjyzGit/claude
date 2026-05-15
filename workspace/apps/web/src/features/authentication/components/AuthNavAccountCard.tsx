import {useTranslation} from 'react-i18next';

import {useUserDetails} from '@/lib/auth';
import {getInitials} from '@/utils';

import {AuthNavAccountMenu} from './AuthNavAccountMenu';
import {NavAccountCard} from './NavAccountCard';

import type {FC} from 'react';

export const AuthNavAccountCard: FC = () => {
  const {name, roles} = useUserDetails();
  const {t} = useTranslation('common');

  const role = roles[0] ? t(`roles.${roles[0]}`) : undefined;

  return (
    <AuthNavAccountMenu
      trigger={<NavAccountCard name={name ?? ''} role={role} initials={getInitials(name ?? '')} />}
    />
  );
};
