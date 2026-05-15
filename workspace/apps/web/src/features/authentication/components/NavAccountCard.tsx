import {Avatar, Icon} from '@sollapay/ui/components';
import {forwardRef} from 'react';

import type {ComponentPropsWithoutRef} from 'react';

interface NavAccountCardProps extends ComponentPropsWithoutRef<'button'> {
  name: string;
  role?: string;
  initials: string;
}

export const NavAccountCard = forwardRef<HTMLButtonElement, NavAccountCardProps>(
  ({name, role, initials, ...rest}, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border border-border bg-background-surface p-3
                   group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0"
        {...rest}
      >
        <div className="absolute end-1.25 top-1.25 flex size-8 items-center justify-center rounded-sm group-data-[collapsible=icon]:hidden">
          <Icon name="chevrons-updown" className="size-5 text-fg-secondary" />
        </div>

        <Avatar size="lg" initials={initials} alt={name} />

        <div className="flex min-w-0 flex-1 flex-col items-start text-start group-data-[collapsible=icon]:hidden">
          <span className="truncate text-sm font-semibold text-fg">{name}</span>
          <span className="truncate text-sm text-fg-tertiary">{role || '\u00A0'}</span>
        </div>
      </button>
    );
  }
);

NavAccountCard.displayName = 'NavAccountCard';
