import {withHebrew} from '@/stories/i18n-decorators';

import {ShowMoreButton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Activity/ShowMoreButton',
  component: ShowMoreButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    onLoadMore: () => {},
    isLoading: false
  }
} satisfies Meta<typeof ShowMoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
