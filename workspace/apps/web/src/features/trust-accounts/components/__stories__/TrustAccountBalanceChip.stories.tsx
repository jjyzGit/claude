import {TrustStatus} from '@sollapay/enums';

import {withEnglish, withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountBalanceChip} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/TrustAccountBalanceChip',
  component: TrustAccountBalanceChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    status: TrustStatus.TRUST_ACTIVE,
    balance: '4325000'
  }
} satisfies Meta<typeof TrustAccountBalanceChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withHebrew]
};

export const LargeAmount: Story = {
  decorators: [withHebrew],
  args: {balance: '54200000'}
};

export const SmallAmount: Story = {
  decorators: [withHebrew],
  args: {balance: '1250'}
};

export const Small: Story = {
  decorators: [withHebrew],
  args: {size: 'sm'}
};

export const Inactive: Story = {
  decorators: [withHebrew],
  args: {status: TrustStatus.SETUP_IN_PROGRESS}
};

export const English: Story = {
  decorators: [withEnglish]
};
