import {
  Avatar,
  Popover,
  PopoverButton,
  PopoverContent,
  PopoverTrigger,
  Typography
} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {FC, ReactElement} from 'react';

export interface AccountItem {
  name: string;
  email: string;
  initials: string;
}

export interface NavAccountMenuProps {
  trigger: ReactElement;
  accounts: AccountItem[];
  onLogout: () => void;
}

export const NavAccountMenu: FC<NavAccountMenuProps> = ({trigger, accounts, onLogout}) => {
  const {t} = useTranslation(['common', 'nav']);

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent side="top" align="start" className="w-(--anchor-width) min-w-60 p-0">
        <div data-slot="nav-account-menu" className="overflow-hidden rounded-xl bg-background">
          <div
            data-slot="nav-account-menu-accounts-card"
            className="rounded-t-xl rounded-b-2xl bg-background-surface"
          >
            <div className="flex flex-col gap-0.5 py-1.5">
              <Typography
                data-slot="nav-account-menu-section-label"
                size="xs"
                weight="semibold"
                color="tertiary"
                className="px-3 pb-1 pt-1.5"
              >
                {t('nav:accounts')}
              </Typography>
              <div data-slot="nav-account-menu-accounts-list" className="px-1.5">
                {accounts.map(account => (
                  <div
                    key={`${account.email}-${account.name}`}
                    data-slot="nav-account-menu-account-row"
                    className="flex items-center gap-3 rounded-sm bg-background-surface_hover px-2 py-1.5"
                  >
                    <Avatar size="lg" initials={account.initials} alt={account.name} />
                    <div
                      data-slot="nav-account-menu-account-text"
                      className="flex min-w-0 flex-1 flex-col"
                    >
                      <span className="truncate text-sm font-semibold text-fg">{account.name}</span>
                      <span className="truncate text-sm text-fg-tertiary">{account.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-slot="nav-account-menu-footer" className="px-1.5 pb-1.5 pt-1">
            <PopoverButton data-slot="nav-account-menu-logout" icon="logout" onClick={onLogout}>
              {t('logout')}
            </PopoverButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
