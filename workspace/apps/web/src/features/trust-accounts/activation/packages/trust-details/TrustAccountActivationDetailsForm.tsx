import {TrustDetailsStep} from '@/features/trust-accounts/activation/config';
import {useTrustDetailsPackageQuery} from '@/features/trust-accounts/activation/hooks';

import {DeveloperDetailsStepForm, TrustScopeStepForm} from './components';

import type {FormStateSnapshot} from '@/hooks';
import type {FC} from 'react';

type TrustAccountActivationDetailsFormProps = {
  trustAccountId: string;
  activeStep: TrustDetailsStep;
  onFormStateChange?: (state: FormStateSnapshot) => void;
  onStepError?: (step: string, hasErrors: boolean) => void;
};

export const TrustAccountActivationDetailsForm: FC<TrustAccountActivationDetailsFormProps> = ({
  trustAccountId,
  activeStep,
  onFormStateChange,
  onStepError
}) => {
  const {data, isLoading, isError} = useTrustDetailsPackageQuery(trustAccountId);
  const scope = data?.data.scope;
  const developer = data?.data.developer;

  const makeStepHandler = (step: TrustDetailsStep) => (state: FormStateSnapshot) => {
    onStepError?.(step, state.hasErrors);
    if (activeStep === step) onFormStateChange?.(state);
  };

  return (
    <div>
      <div hidden={activeStep !== TrustDetailsStep.TRUST_SCOPE}>
        <TrustScopeStepForm
          trustAccountId={trustAccountId}
          scope={scope}
          isLoading={isLoading}
          isError={isError}
          onFormStateChange={makeStepHandler(TrustDetailsStep.TRUST_SCOPE)}
        />
      </div>

      <div hidden={activeStep !== TrustDetailsStep.DEVELOPER_DETAILS}>
        <DeveloperDetailsStepForm
          trustAccountId={trustAccountId}
          developer={developer}
          isLoading={isLoading}
          isError={isError}
          onFormStateChange={makeStepHandler(TrustDetailsStep.DEVELOPER_DETAILS)}
        />
      </div>
    </div>
  );
};
