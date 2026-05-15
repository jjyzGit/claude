import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
  Button,
  Popover,
  PopoverTrigger
} from '@sollapay/ui/components';

import {getInitials} from '@/utils/get-initials.utils';

import {formatBuyerDisplayName} from '../utils';
import {BuyerGroupPopoverContent} from './BuyerGroupPopover';

import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

const MAX_VISIBLE = 3;

export interface BuyerAvatarStackProps {
  buyers: BuyerDTO[];
  unitLabel?: string;
  onViewBuyer: (buyer: BuyerDTO) => void;
}

export const BuyerAvatarStack: FC<BuyerAvatarStackProps> = ({buyers, unitLabel, onViewBuyer}) => {
  const visible = buyers.slice(0, MAX_VISIBLE);
  const overflow = buyers.length - MAX_VISIBLE;

  const avatarGroup = (
    <AvatarGroup>
      {visible.map(buyer => {
        const displayName = formatBuyerDisplayName(buyer.fullName);
        return (
          <Avatar
            key={buyer.id}
            initials={getInitials(displayName)}
            size="lg"
            seed={buyer.id}
            noShadow
            fallbackClassName="text-fg"
          />
        );
      })}
      {overflow > 0 && <AvatarGroupCount>+{overflow}</AvatarGroupCount>}
    </AvatarGroup>
  );

  if (buyers.length <= 1) {
    return avatarGroup;
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="tertiary"
            className="h-auto cursor-pointer p-0 hover:bg-transparent"
            onClick={e => e.stopPropagation()}
          >
            {avatarGroup}
          </Button>
        }
      />
      <BuyerGroupPopoverContent
        buyers={buyers}
        unitLabel={unitLabel}
        mode="all"
        onViewBuyer={onViewBuyer}
      />
    </Popover>
  );
};
