import {EmptyState, Illustration} from '@sollapay/ui/components';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

export const TransactionsEmptyState: FC = () => {
  const {t} = useTranslation('trustAccounts');

  return (
    <EmptyState
      illustration={
        <Illustration width={166} height={160}>
          <SearchIllustration />
        </Illustration>
      }
      title={t('view.transactions.empty.title')}
      subtitle={t('view.transactions.empty.description')}
    />
  );
};
