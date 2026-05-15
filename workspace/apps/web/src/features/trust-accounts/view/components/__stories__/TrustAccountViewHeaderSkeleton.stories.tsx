import {withHebrew} from '@/stories/i18n-decorators';
import {withRouter} from '@/stories/router-decorators';

import {TrustAccountViewHeaderSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountViewHeaderSkeleton',
  component: TrustAccountViewHeaderSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [withRouter],
  args: {
    activeTab: 'overview',
    onTabChange: () => {}
  }
} satisfies Meta<typeof TrustAccountViewHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BuyersTab: Story = {
  args: {
    activeTab: 'buyers'
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
