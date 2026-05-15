import {withHebrew} from '@/stories/i18n-decorators';

import {BuyersTabContent} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Tabs/BuyersTabContent',
  component: BuyersTabContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    trustAccount: {id: 'trust-account-123', refId: 'TA-123', name: 'Story Trust Account'}
  }
} satisfies Meta<typeof BuyersTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
