import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {ActivationPackageCta} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta: Meta<typeof ActivationPackageCta> = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageCta',
  component: ActivationPackageCta,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Edit: Story = {
  args: {
    action: 'edit'
  }
};

export const Start: Story = {
  args: {
    action: 'start'
  }
};

export const NoAction: Story = {
  args: {
    action: null
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    action: 'start'
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <ActivationPackageCta {...args} />
      </div>
    </DirectionProvider>
  )
};
