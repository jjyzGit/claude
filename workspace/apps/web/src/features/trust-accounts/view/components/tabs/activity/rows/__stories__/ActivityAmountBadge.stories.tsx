import {ActivityAmountBadge} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Activity/ActivityAmountBadge',
  component: ActivityAmountBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    amountNis: '87500',
    variant: 'credit'
  }
} satisfies Meta<typeof ActivityAmountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Credit: Story = {};

export const Debit: Story = {
  args: {
    variant: 'debit'
  }
};
