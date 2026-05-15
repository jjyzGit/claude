import {Button, ErrorState, Illustration} from '@sollapay/ui/components';
import {DrawHtmlIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

interface PageErrorStateProps {
  refetch?: () => void;
}

export const PageErrorState: FC<PageErrorStateProps> = ({refetch}) => {
  const {t} = useTranslation('common');

  return (
    <div className="flex min-h-150 items-center justify-center">
      <ErrorState
        illustration={
          <Illustration width={166}>
            <DrawHtmlIllustration />
          </Illustration>
        }
        title={t('errorState.title')}
        subtitle={t('errorState.subtitle')}
        action={
          refetch && (
            <Button variant="secondary" size="sm" onClick={refetch}>
              {t('errorState.retry')}
            </Button>
          )
        }
      />
    </div>
  );
};
