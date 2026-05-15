import {MoreMenu} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {MoreMenuProps} from '@sollapay/ui/components';
import type {FC} from 'react';

export type TrustAccountMenuAction = 'edit' | 'delete';

export interface TrustAccountMoreMenuProps {
  actions: TrustAccountMenuAction[];
  onEdit?: () => void;
  onDelete?: () => void;
  orientation?: MoreMenuProps['orientation'];
}

export const TrustAccountMoreMenu: FC<TrustAccountMoreMenuProps> = ({
  actions,
  onEdit,
  onDelete,
  orientation
}) => {
  const {t} = useTranslation('trustAccounts');

  const actionConfig: Record<TrustAccountMenuAction, MoreMenuProps['items'][number]> = {
    edit: {
      icon: 'pen',
      label: t('tableActions.editAccount'),
      onClick: () => onEdit?.()
    },
    delete: {
      icon: 'delete',
      label: t('tableActions.deleteAccount'),
      onClick: () => onDelete?.(),
      destructive: true,
      separator: true
    }
  };

  const handlerMap: Record<TrustAccountMenuAction, (() => void) | undefined> = {
    edit: onEdit,
    delete: onDelete
  };

  const items = actions.filter(action => !!handlerMap[action]).map(action => actionConfig[action]);

  return (
    <MoreMenu ariaLabel={t('tableActions.openMenu')} orientation={orientation} items={items} />
  );
};
