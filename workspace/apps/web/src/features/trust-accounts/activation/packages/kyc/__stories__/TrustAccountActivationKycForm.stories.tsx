import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountActivationKycForm} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Activation/Packages/TrustAccountActivationKycForm',
  component: TrustAccountActivationKycForm,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    trustAccountId: 'trust-account-1',
    activeStep: 'kyc-step'
  }
} satisfies Meta<typeof TrustAccountActivationKycForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
