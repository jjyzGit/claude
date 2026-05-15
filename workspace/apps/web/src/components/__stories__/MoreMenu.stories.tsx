import {withHebrew} from '@/stories/i18n-decorators';

import {MoreMenu} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/MoreMenu',
  component: MoreMenu,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    editLabel: 'Edit',
    deleteLabel: 'Delete',
    onEdit: () => {},
    onDelete: () => {}
  }
} satisfies Meta<typeof MoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EditOnly: Story = {
  args: {
    onDelete: undefined
  }
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal'
  }
};
