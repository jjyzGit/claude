import {ActivationETABanner} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof ActivationETABanner> = {
  title: 'Features/TrustAccounts/Activation/ActivationETABanner',
  component: ActivationETABanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
