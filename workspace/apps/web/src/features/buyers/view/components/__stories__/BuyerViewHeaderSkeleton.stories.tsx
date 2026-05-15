import {withHebrew} from '@/stories/i18n-decorators';
import {withRouter} from '@/stories/router-decorators';

import {BuyerViewHeaderSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerViewHeaderSkeleton',
  component: BuyerViewHeaderSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [withRouter]
} satisfies Meta<typeof BuyerViewHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
