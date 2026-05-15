import {withHebrew} from '@/stories/i18n-decorators';

import {TransactionsTabContent} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Tabs/TransactionsTabContent',
  component: TransactionsTabContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    trustAccount: {id: 'mock-trust-account-id', refId: 'TA-001', name: 'Story Trust Account'}
  }
} satisfies Meta<typeof TransactionsTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
