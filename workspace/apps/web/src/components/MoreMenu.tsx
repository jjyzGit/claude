import {MoreMenu as MoreMenuBase} from '@sollapay/ui/components';

import type {MoreMenuProps as MoreMenuBaseProps} from '@sollapay/ui/components';
import type {FC} from 'react';

interface MoreMenuProps {
  onEdit: () => void;
  onDelete?: () => void;
  editLabel: string;
  deleteLabel: string;
  ariaLabel?: string;
  orientation?: MoreMenuBaseProps['orientation'];
}

export const MoreMenu: FC<MoreMenuProps> = ({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  ariaLabel = 'Open menu',
  orientation
}) => {
  return (
    <MoreMenuBase
      ariaLabel={ariaLabel}
      orientation={orientation}
      items={[
        {
          icon: 'edit',
          label: editLabel,
          onClick: onEdit
        },
        ...(onDelete
          ? [
              {
                icon: 'delete' as const,
                label: deleteLabel,
                onClick: onDelete,
                destructive: true,
                separator: true
              }
            ]
          : [])
      ]}
    />
  );
};

export type {MoreMenuProps};
