import {Auth0Provider as Auth0} from '@auth0/auth0-react';

import {config} from '@/app';

import type {FC, PropsWithChildren} from 'react';

export const Auth0Provider: FC<PropsWithChildren> = ({children}) => {
  return (
    <Auth0
      domain={config.auth0.domain}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      clientId={config.auth0.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: config.auth0.audience
      }}
    >
      {children}
    </Auth0>
  );
};
