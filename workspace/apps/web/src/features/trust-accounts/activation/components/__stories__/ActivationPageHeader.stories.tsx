import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {ActivationPageHeader} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta = {
  title: 'Features/TrustAccounts/Activation/ActivationPageHeader',
  component: ActivationPageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof ActivationPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <ActivationPageHeader />
      </div>
    </DirectionProvider>
  )
};
