import {useAuth0} from '@auth0/auth0-react';
import {Button} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {config} from '@/app/app.config';

import {LanguageSwitcher} from '../lib/i18n/components';

import type {FC} from 'react';

export const DebugModeHeader: FC = () => {
  const {logout} = useAuth0();
  const {t} = useTranslation();

  if (!config.debug) return null;

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-yellow-50">
      <span className="font-semibold text-lg">Debug Mode</span>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
        >
          {t('logout')}
        </Button>
      </div>
    </header>
  );
};
