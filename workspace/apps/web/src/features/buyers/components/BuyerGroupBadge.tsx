import {Badge, Button, Icon, Popover, PopoverTrigger} from '@sollapay/ui/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {BuyerGroupPopoverContent} from './BuyerGroupPopover';

import type {BuyerDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerGroupBadgeProps {
  buyers: BuyerDTO[];
  unitLabel?: string;
  onViewBuyer: (buyer: BuyerDTO) => void;
}

export const BuyerGroupBadge: FC<BuyerGroupBadgeProps> = ({buyers, unitLabel, onViewBuyer}) => {
  const {t} = useTranslation('trustAccounts');
  const [hovered, setHovered] = useState(false);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="tertiary"
            className="h-auto cursor-pointer p-0 hover:bg-transparent"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={e => e.stopPropagation()}
          >
            <Badge variant={hovered ? 'info' : 'gray'} size="md">
              <Icon name="users-group" className="size-3" />
              {t('view.buyers.list.extraBuyers', {count: buyers.length})}
            </Badge>
          </Button>
        }
      />
      <BuyerGroupPopoverContent
        buyers={buyers}
        unitLabel={unitLabel}
        mode="extra"
        onViewBuyer={onViewBuyer}
      />
    </Popover>
  );
};
