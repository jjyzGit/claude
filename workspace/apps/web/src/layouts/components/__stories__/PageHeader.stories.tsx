import {Button, Icon} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import {PageHeader} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  args: {
    title: 'Dashboard'
  }
};

export const WithBadge: Story = {
  args: {
    title: 'Transactions',
    badge: '148'
  }
};

export const WithDescription: Story = {
  args: {
    title: 'Settings',
    description: 'Configure your organization preferences and integrations'
  }
};

export const WithActions: Story = {
  args: {
    title: 'Users',
    actions: (
      <Button>
        <Icon name="invite-user" />
        Invite User
      </Button>
    )
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    title: 'חשבונות נאמנות',
    description: 'ניהול חשבונות נאמנות ויתרותיהם',
    badge: '12',
    actions: (
      <Button>
        <Icon name="add" />
        הוספת חשבון
      </Button>
    )
  }
};
