import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountMoreMenu} from '../TrustAccountMoreMenu';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountMoreMenu',
  component: TrustAccountMoreMenu,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    actions: ['edit', 'delete'],
    onEdit: () => {},
    onDelete: () => {}
  }
} satisfies Meta<typeof TrustAccountMoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllActions: Story = {};

export const EditOnly: Story = {
  args: {actions: ['edit']}
};

export const Vertical: Story = {
  args: {orientation: 'vertical'}
};

export const RTL: Story = {
  decorators: [withHebrew]
};
