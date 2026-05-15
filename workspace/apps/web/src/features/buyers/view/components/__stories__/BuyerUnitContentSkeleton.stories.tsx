import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerUnitContentSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerUnitContentSkeleton',
  component: BuyerUnitContentSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof BuyerUnitContentSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
