import {useAuth0} from '@auth0/auth0-react';

import {useUserDetails} from '@/lib/auth';
import {getInitials} from '@/utils';

import {NavAccountMenu} from './NavAccountMenu';

import type {FC, ReactElement} from 'react';

interface AuthNavAccountMenuProps {
  trigger: ReactElement;
}

export const AuthNavAccountMenu: FC<AuthNavAccountMenuProps> = ({trigger}) => {
  const {name, email} = useUserDetails();
  const {logout} = useAuth0();

  const handleLogout = () => {
    void logout({logoutParams: {returnTo: window.location.origin}});
  };

  const accounts = [
    {
      name: name ?? '',
      email: email ?? '',
      initials: getInitials(name ?? '')
    }
  ];

  return <NavAccountMenu trigger={trigger} accounts={accounts} onLogout={handleLogout} />;
};
