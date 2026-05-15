import {Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {ActivationETABanner} from './ActivationETABanner';

export const ActivationPageHeader = () => {
  const {t} = useTranslation('trustAccounts');

  return (
    <div className="pt-6" data-slot="activation-page-header">
      <div className="flex items-start justify-between gap-4 px-8 pb-4">
        <div className="flex flex-col items-start gap-0.5 text-right">
          <Typography as="p" size="lg" weight="semibold" color="default">
            {t('activation.sectionTitle')}
          </Typography>

          <Typography as="p" size="sm" color="tertiary" className="truncate">
            {t('activation.sectionSubtitle')}
          </Typography>
        </div>

        <ActivationETABanner />
      </div>
      <hr className="border-border-subtle" />
    </div>
  );
};
