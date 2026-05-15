import {withHebrew} from '@/stories/i18n-decorators';

import {ActivationPackageStepsNav} from '..';

import type {StepsMap} from '@/features/trust-accounts/activation/config';
import type {Meta, StoryObj} from '@storybook/react-vite';

const trustDetailsSteps: StepsMap = {
  'trust-scope': {labelKey: 'activation.packageFormModal.steps.trustScope'},
  'developer-details': {labelKey: 'activation.packageFormModal.steps.developerDetails'}
};

const complianceSteps: StepsMap = {
  'supporting-documents': {labelKey: 'activation.packageFormModal.steps.supportingDocuments'},
  'residency-status': {labelKey: 'activation.packageFormModal.steps.residencyStatus'}
};

const meta = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageStepsNav',
  component: ActivationPackageStepsNav,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    items: trustDetailsSteps,
    value: 'trust-scope',
    onChange: () => {}
  }
} satisfies Meta<typeof ActivationPackageStepsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondStepActive: Story = {
  args: {
    value: 'developer-details'
  }
};

export const WithStepError: Story = {
  args: {
    errorsMap: {'trust-scope': true}
  }
};

export const ComplianceSteps: Story = {
  args: {
    items: complianceSteps,
    value: 'supporting-documents'
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
