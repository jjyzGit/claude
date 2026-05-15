import {withHebrew} from '@/stories/i18n-decorators';

import {BuyersEmptyState} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Empty States/BuyersEmptyState',
  component: BuyersEmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    onAddBuyer: () => {}
  }
} satisfies Meta<typeof BuyersEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
