import {withHebrew} from '@/stories/i18n-decorators';

import {DocumentsTabContent} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Tabs/DocumentsTabContent',
  component: DocumentsTabContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    trustAccount: {id: 'story-trust-account-id', refId: 'TA-001', name: 'Story Trust Account'}
  }
} satisfies Meta<typeof DocumentsTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {};

export const Loading: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
