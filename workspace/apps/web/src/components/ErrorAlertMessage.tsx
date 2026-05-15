import {Alert} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {getTranslatedErrorMessages} from '@/utils';

interface ErrorAlertMessageProps {
  error: unknown;
  className?: string;
}

export function ErrorAlertMessage({error, className}: ErrorAlertMessageProps) {
  const {t} = useTranslation('common');

  return (
    <Alert
      variant="error"
      title={t('errors.title')}
      description={getTranslatedErrorMessages(error, t)}
      className={className}
    />
  );
}
