import {withHebrew} from '@/stories/i18n-decorators';

import {TransactionsTabContentSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Tabs/TransactionsTabContentSkeleton',
  component: TransactionsTabContentSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof TransactionsTabContentSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
