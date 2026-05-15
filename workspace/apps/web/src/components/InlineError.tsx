import {Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {getTranslatedErrorMessages} from '@/utils';

interface InlineErrorProps {
  error: unknown;
}

export function InlineError({error}: InlineErrorProps) {
  const {t} = useTranslation('common');
  const messages = getTranslatedErrorMessages(error, t);

  return (
    <Typography as="p" size="sm" className="text-destructive">
      {messages.join('. ')}
    </Typography>
  );
}
