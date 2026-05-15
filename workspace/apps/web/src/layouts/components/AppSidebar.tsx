import {Sidebar} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';

import {AuthNavAccountCard, AuthAppLogo, AuthAppLogomark} from '@/features/authentication';

import {navItems} from '../config/nav-items.config';
import {useSidebarModePreference} from '../hooks/useSidebarModePreference';

import type {SidebarNavGroup, SidebarProps} from '@sollapay/ui/components';
import type {FC, ReactNode} from 'react';

interface AppSidebarProps {
  children: ReactNode;
}

export const AppSidebar: FC<AppSidebarProps> = ({children}) => {
  const {t} = useTranslation('nav');
  const location = useLocation();
  const navigate = useNavigate();
  const {mode: sidebarMode, setPreferredMode: setSidebarMode} =
    useSidebarModePreference('expanded');

  const groups: SidebarNavGroup[] = [
    {
      id: 'main',
      label: t('main'),
      items: navItems.map(item => ({
        id: item.id,
        label: t(item.labelKey),
        icon: item.icon,
        isActive: location.pathname === item.path,
        disabled: item.disabled,
        onClick: () => {
          navigate(item.path);
        }
      }))
    }
  ];

  const sidebarProps: SidebarProps = {
    logo: <AuthAppLogo />,
    collapsedLogo: <AuthAppLogomark />,
    groups,
    footer: <AuthNavAccountCard />,
    children,
    open: sidebarMode === 'expanded',
    onOpenChange: (isOpen: boolean) => setSidebarMode(isOpen ? 'expanded' : 'collapsed')
  };

  return <Sidebar {...sidebarProps} />;
};
