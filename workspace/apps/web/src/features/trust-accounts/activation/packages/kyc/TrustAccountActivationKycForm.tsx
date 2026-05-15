import {EmptyState} from '@sollapay/ui/components';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import type {FormStateSnapshot} from '@/features/trust-accounts/activation/hooks';
import type {FC} from 'react';

export type TrustAccountActivationKycFormProps = {
  trustAccountId: string;
  activeStep: string;
  onFormStateChange?: (state: FormStateSnapshot) => void;
};

export const TrustAccountActivationKycForm: FC<TrustAccountActivationKycFormProps> = () => {
  const {t} = useTranslation('common');

  return <EmptyState title={t('comingSoon')} illustration={<SearchIllustration />} />;
};
