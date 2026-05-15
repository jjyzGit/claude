import {Button, EmptyState, Icon, Illustration} from '@sollapay/ui/components';
import {SaveMoneyIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

interface BuyersEmptyStateProps {
  onAddBuyer: () => void;
}

export const BuyersEmptyState: FC<BuyersEmptyStateProps> = ({onAddBuyer}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <EmptyState
      illustration={
        <Illustration width={166} height={160}>
          <SaveMoneyIllustration />
        </Illustration>
      }
      title={t('view.buyers.empty.title')}
      subtitle={t('view.buyers.empty.description')}
      action={
        <Button variant="primary" size="sm" onClick={onAddBuyer}>
          <Icon name="add" />
          {t('view.buyers.empty.action')}
        </Button>
      }
    />
  );
};

export type {BuyersEmptyStateProps};
