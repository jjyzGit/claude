import {ActivationPackageStatusBadge} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof ActivationPackageStatusBadge> = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageStatusBadge',
  component: ActivationPackageStatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    statusLabelKey: 'activation.packageStatus.optional'
  }
};

export const DraftStatus: Story = {
  args: {
    statusLabelKey: 'activation.packageStatus.notSubmitted'
  }
};

export const SubmittedStatus: Story = {
  args: {
    statusLabelKey: 'activation.packageStatus.submitted'
  }
};

export const Null: Story = {
  args: {
    statusLabelKey: null
  }
};
