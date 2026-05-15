import type {IconName} from '@sollapay/ui/components';

export interface NavItemConfig {
  id: string;
  labelKey: string;
  icon: IconName;
  path: string;
  disabled?: boolean;
}

export const navItems: NavItemConfig[] = [
  {id: 'accounts', labelKey: 'accounts', icon: 'shield', path: '/trust-accounts'}
];
