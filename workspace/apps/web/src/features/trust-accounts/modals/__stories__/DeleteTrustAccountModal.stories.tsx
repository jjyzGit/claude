import i18n from '@/lib/i18n/config';

import {DeleteTrustAccountModal} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta = {
  title: 'Features/TrustAccounts/DeleteTrustAccountModal',
  component: DeleteTrustAccountModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    accountName: 'Riverside Towers Phase 1',
    onConfirm: () => {},
    onClose: () => {}
  }
} satisfies Meta<typeof DeleteTrustAccountModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: new Error('Failed to delete trust account')
  }
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    error: new Error('Failed to delete trust account')
  }
};
