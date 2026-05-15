import {Avatar, Icon, PopoverContent, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {getInitials} from '@/utils/get-initials.utils';

import {formatBuyerDisplayName} from '../utils';

import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerGroupPopoverContentProps {
  buyers: BuyerDTO[];
  unitLabel?: string;
  mode?: 'all' | 'extra';
  onViewBuyer: (buyer: BuyerDTO) => void;
}

/**
 * Shared popover content listing buyers — used by both BuyerGroupBadge and BuyerAvatarStack.
 */
export const BuyerGroupPopoverContent: FC<BuyerGroupPopoverContentProps> = ({
  buyers,
  unitLabel,
  mode = 'extra',
  onViewBuyer
}) => {
  const {t, i18n} = useTranslation('trustAccounts');
  const dir = i18n.dir();
  const isAll = mode === 'all';
  const countLabel = isAll
    ? t('view.buyers.list.buyerCountLabel')
    : t('view.buyers.list.extraBuyerCountLabel');

  return (
    <PopoverContent
      side="bottom"
      align="center"
      className="flex w-56 flex-col gap-1 p-1.25"
      dir={dir}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1.5">
        {isAll && unitLabel && (
          <div className="flex items-center gap-2">
            <Icon name="users-group" className="size-4 text-fg-placeholder" />
            <Typography size="xs" color="tertiary">
              {t('view.buyers.list.buyersInUnit', {unit: unitLabel})}
            </Typography>
          </div>
        )}
        <Typography size="xs" color="tertiary">
          {buyers.length} {countLabel}
        </Typography>
      </div>

      <div className="h-px w-full bg-border-subtle" />

      {/* Buyer rows */}
      {buyers.map((buyer, index) => {
        const displayName = formatBuyerDisplayName(buyer.fullName);
        return (
          <div key={buyer.id}>
            {index > 0 && <div className="h-px w-full bg-border-subtle" />}
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded p-1 hover:bg-background-secondary"
              onClick={e => {
                e.stopPropagation();
                onViewBuyer(buyer);
              }}
            >
              <Avatar
                initials={getInitials(displayName)}
                size="lg"
                seed={buyer.id}
                fallbackClassName="text-fg"
              />
              <Typography size="sm" weight="medium">
                {displayName}
              </Typography>
            </button>
          </div>
        );
      })}
    </PopoverContent>
  );
};
