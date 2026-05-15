import {withHebrew} from '@/stories/i18n-decorators';

import {ResidencyTaxStepForm} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Activation/Packages/Compliance/ResidencyTaxStepForm',
  component: ResidencyTaxStepForm,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    trustAccountId: 'trust-account-1'
  }
} satisfies Meta<typeof ResidencyTaxStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
