import {FormShell} from '@/components';
import {ComplianceStep} from '@/features/trust-accounts/activation/config';

import {ResidencyTaxStepForm, SupportingDocsStepForm} from './components';

import type {FormStateSnapshot} from '@/hooks';
import type {FC} from 'react';

type TrustAccountActivationComplianceFormProps = {
  trustAccountId: string;
  activeStep: ComplianceStep;
  onFormStateChange?: (state: FormStateSnapshot) => void;
  onStepError?: (step: string, hasErrors: boolean) => void;
};

export const TrustAccountActivationComplianceForm: FC<
  TrustAccountActivationComplianceFormProps
> = ({trustAccountId, activeStep, onFormStateChange, onStepError}) => {
  const makeStepHandler = (step: ComplianceStep) => (state: FormStateSnapshot) => {
    onStepError?.(step, state.hasErrors);
    if (activeStep === step) onFormStateChange?.(state);
  };

  return (
    <FormShell
      id="compliance-form"
      className="flex flex-col gap-6"
      onSubmit={e => e.preventDefault()}
    >
      <div hidden={activeStep !== ComplianceStep.RESIDENCY_STATUS}>
        <ResidencyTaxStepForm trustAccountId={trustAccountId} />
      </div>

      <div hidden={activeStep !== ComplianceStep.SUPPORTING_DOCUMENTS}>
        <SupportingDocsStepForm
          trustAccountId={trustAccountId}
          onFormStateChange={makeStepHandler(ComplianceStep.SUPPORTING_DOCUMENTS)}
        />
      </div>
    </FormShell>
  );
};
