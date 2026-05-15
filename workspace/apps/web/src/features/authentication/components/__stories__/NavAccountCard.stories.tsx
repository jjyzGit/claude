import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {NavAccountCard} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta: Meta<typeof NavAccountCard> = {
  title: 'Features/Authentication/NavAccountCard',
  component: NavAccountCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    name: 'Dan Ziv',
    initials: 'DZ',
    role: 'Firm Admin'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutRole: Story = {
  args: {
    role: undefined
  }
};

export const LongName: Story = {
  args: {
    name: 'Jonathan Alexander von Schwarzenegger',
    initials: 'JA',
    role: 'Lawyer'
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    name: 'דניאל זיו',
    initials: 'דז',
    role: 'עורך דין'
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-72">
        <NavAccountCard {...args} />
      </div>
    </DirectionProvider>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
