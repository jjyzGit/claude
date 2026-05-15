import {withHebrew} from '@/stories/i18n-decorators';

import {SubmitTrustAccountModal} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Activation/Modals/SubmitTrustAccountModal',
  component: SubmitTrustAccountModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    isOpen: true,
    state: 'confirm',
    onConfirm: () => {},
    onClose: () => {}
  }
} satisfies Meta<typeof SubmitTrustAccountModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const Success: Story = {
  args: {
    state: 'success'
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};

export const RTLSuccess: Story = {
  decorators: [withHebrew],
  args: {
    state: 'success'
  }
};
