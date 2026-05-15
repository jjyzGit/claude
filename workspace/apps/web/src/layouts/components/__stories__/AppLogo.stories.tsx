import {DirectionProvider} from '@sollapay/ui/providers';

import {AppLogo, AppLogomark} from '@/layouts/components/AppLogo';
import i18n from '@/lib/i18n/config';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta = {
  title: 'Components/AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Logomark: Story = {
  render: () => <AppLogomark />
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div style={{transform: 'scale(0.75)', transformOrigin: 'center'}}>
        <AppLogomark />
      </div>
      <AppLogomark />
      <div style={{transform: 'scale(1.5)', transformOrigin: 'center'}}>
        <AppLogomark />
      </div>
      <div style={{transform: 'scale(2)', transformOrigin: 'center'}}>
        <AppLogomark />
      </div>
    </div>
  )
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <AppLogo />
      </div>
    </DirectionProvider>
  )
};
