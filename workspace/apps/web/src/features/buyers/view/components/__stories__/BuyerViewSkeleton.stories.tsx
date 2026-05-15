import {withHebrew} from '@/stories/i18n-decorators';
import {withRouter} from '@/stories/router-decorators';

import {BuyerViewSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerViewSkeleton',
  component: BuyerViewSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [withRouter]
} satisfies Meta<typeof BuyerViewSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
