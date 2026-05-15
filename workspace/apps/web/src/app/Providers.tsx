import {Toaster} from '@sollapay/ui/components';

import {Auth0Provider} from '@/lib/auth/providers';
import {useDirection} from '@/lib/i18n/hooks';
import {I18nProvider} from '@/lib/i18n/providers';
import {QueryClientProvider} from '@/lib/query/providers';

import type {FC, PropsWithChildren} from 'react';

const ToasterMount: FC = () => {
  const dir = useDirection();
  return <Toaster position={dir === 'rtl' ? 'bottom-left' : 'bottom-right'} expand />;
};

export const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <I18nProvider>
      <ToasterMount />
      <Auth0Provider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </Auth0Provider>
    </I18nProvider>
  );
};
