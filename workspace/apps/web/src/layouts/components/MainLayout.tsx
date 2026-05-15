import {SidebarMain} from '@sollapay/ui/components';
import {Outlet} from 'react-router-dom';

import {usePaymentReceivedToast} from '@/features/payments/hooks';
import {useTrustAccountActivatedToast} from '@/features/trust-accounts/hooks';

import {AppSidebar} from './AppSidebar';
import {DebugModeHeader} from '../../components';

import type {FC} from 'react';

export const MainLayout: FC = () => {
  useTrustAccountActivatedToast();
  usePaymentReceivedToast();

  return (
    <AppSidebar>
      <SidebarMain className="overflow-hidden">
        <DebugModeHeader />
        <Outlet />
      </SidebarMain>
    </AppSidebar>
  );
};
