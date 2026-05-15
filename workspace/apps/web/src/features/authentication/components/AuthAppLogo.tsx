import {AppLogo, AppLogomark} from '@/layouts';
import {useUserDetails} from '@/lib/auth';

import type {FC} from 'react';

export const AuthAppLogomark: FC = () => {
  const {org} = useUserDetails();

  if (org?.logoUrl) {
    return (
      <img src={org.logoUrl} alt={org.name} className="size-8 shrink-0 rounded-md object-cover" />
    );
  }

  return <AppLogomark />;
};

export const AuthAppLogo: FC = () => {
  const {org} = useUserDetails();

  if (org?.logoUrl) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={org.logoUrl}
          alt={org.name}
          className="size-12 shrink-0 rounded-md object-cover"
        />
        <span className="truncate font-semibold text-fg">{org.displayName ?? org.name}</span>
      </div>
    );
  }

  return <AppLogo />;
};
