import {Button} from '@sollapay/ui/components';
import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {NavAccountMenu} from '..';

import type {AccountItem} from '..';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const singleAccount: AccountItem[] = [
  {
    name: 'Dan Ziv',
    email: 'dan@acmecorp.com',
    initials: 'DZ'
  }
];

const multipleAccounts: AccountItem[] = [
  {
    name: 'Dan Ziv',
    email: 'dan@acmecorp.com',
    initials: 'DZ'
  },
  {
    name: 'Sarah Cohen',
    email: 'sarah@acmecorp.com',
    initials: 'SC'
  },
  {
    name: 'Michael Levy',
    email: 'michael@acmecorp.com',
    initials: 'ML'
  }
];

const meta = {
  title: 'Features/Authentication/NavAccountMenu',
  component: NavAccountMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    trigger: <Button variant="secondary">Open Menu</Button>,
    accounts: singleAccount,
    onLogout: () => {}
  }
} satisfies Meta<typeof NavAccountMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleAccounts: Story = {
  args: {
    accounts: multipleAccounts
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    accounts: [
      {
        name: 'דניאל זיו',
        email: 'dan@acmecorp.com',
        initials: 'דז'
      }
    ]
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <NavAccountMenu {...args} />
      </div>
    </DirectionProvider>
  )
};
