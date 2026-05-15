import {EmptyState, FormSectionHeading} from '@sollapay/ui/components';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

export interface ResidencyTaxStepFormProps {
  trustAccountId: string;
}

export const ResidencyTaxStepForm: FC<ResidencyTaxStepFormProps> = () => {
  const {t} = useTranslation(['trustAccounts', 'common']);

  return (
    <div className="flex flex-col gap-6" data-slot="residency-tax-step-form">
      <FormSectionHeading
        title={t('activation.packages.compliance.residencyStatus.title')}
        description={t('activation.packages.compliance.residencyStatus.description')}
      />
      <EmptyState title={t('common:comingSoon')} illustration={<SearchIllustration />} />
    </div>
  );
};
