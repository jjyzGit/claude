import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerMoreMenu} from '../BuyerMoreMenu';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerMoreMenu',
  component: BuyerMoreMenu,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    actions: ['view', 'edit', 'delete'],
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {}
  }
} satisfies Meta<typeof BuyerMoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllActions: Story = {};

export const ViewOnly: Story = {
  args: {actions: ['view']}
};

export const EditAndDelete: Story = {
  args: {actions: ['edit', 'delete']}
};

export const Vertical: Story = {
  args: {orientation: 'vertical'}
};

export const RTL: Story = {
  decorators: [withHebrew]
};
