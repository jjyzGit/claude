import {ActivationGlobalCta} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof ActivationGlobalCta> = {
  title: 'Features/TrustAccounts/Activation/ActivationGlobalCta',
  component: ActivationGlobalCta,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    onClick: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Continue: Story = {
  args: {
    isVisible: true,
    isReadyToSubmit: false
  }
};

export const ReadyToSubmit: Story = {
  args: {
    isVisible: true,
    isReadyToSubmit: true
  }
};

export const Loading: Story = {
  args: {
    isVisible: true,
    isReadyToSubmit: true,
    isLoading: true
  }
};

export const TrustActive: Story = {
  args: {
    isVisible: true,
    isReadyToSubmit: false,
    isTrustActive: true
  }
};

export const Hidden: Story = {
  args: {
    isVisible: false,
    isReadyToSubmit: false
  }
};
