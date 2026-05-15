import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import {LoginFormSkeleton} from '@/features/authentication';
import {RouterProvider} from '@/lib/router';

import type {FC} from 'react';

const App: FC = () => {
  const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
  const {i18n} = useTranslation(['common', 'auth']);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({
        openUrl: url => window.location.replace(url),
        authorizationParams: {
          ui_locales: i18n.language
        }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, i18n.language]);

  if (isLoading || !isAuthenticated) {
    return <LoginFormSkeleton />;
  }

  return <RouterProvider />;
};

export default App;
