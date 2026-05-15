import {MoreMenu} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {MoreMenuProps} from '@sollapay/ui/components';
import type {FC} from 'react';

export type BuyerMenuAction = 'view' | 'edit' | 'delete';

export interface BuyerMoreMenuProps {
  actions: BuyerMenuAction[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  orientation?: MoreMenuProps['orientation'];
}

export const BuyerMoreMenu: FC<BuyerMoreMenuProps> = ({
  actions,
  onView,
  onEdit,
  onDelete,
  orientation
}) => {
  const {t} = useTranslation('trustAccounts');

  const actionConfig: Record<BuyerMenuAction, MoreMenuProps['items'][number]> = {
    view: {
      icon: 'user',
      label: t('view.buyers.list.actions.viewBuyer'),
      onClick: () => onView?.()
    },
    edit: {
      icon: 'pen',
      label: t('view.buyers.detail.actions.editDetails'),
      onClick: () => onEdit?.(),
      separator: true
    },
    delete: {
      icon: 'delete',
      label: t('view.buyers.detail.actions.deleteBuyer'),
      onClick: () => onDelete?.(),
      destructive: true,
      separator: true
    }
  };

  const handlerMap: Record<BuyerMenuAction, (() => void) | undefined> = {
    view: onView,
    edit: onEdit,
    delete: onDelete
  };

  const items = actions.filter(action => !!handlerMap[action]).map(action => actionConfig[action]);

  return (
    <MoreMenu
      ariaLabel={t('view.buyers.list.actions.moreMenu')}
      orientation={orientation}
      items={items}
    />
  );
};
