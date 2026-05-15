import {TrustStatus} from '@sollapay/enums';
import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {TrustAccountActionButton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const allStatuses = Object.values(TrustStatus);

const meta = {
  title: 'Features/TrustAccounts/TrustAccountActionButton',
  component: TrustAccountActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    status: TrustStatus.TRUST_ACTIVE,
    onClick: () => {}
  }
} satisfies Meta<typeof TrustAccountActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: TrustStatus.TRUST_ACTIVE
  }
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {allStatuses.map(status => (
        <div key={status} className="flex items-center gap-4">
          <span className="w-48 shrink-0 text-sm text-fg-secondary">{status}</span>
          <TrustAccountActionButton status={status} onClick={() => {}} />
        </div>
      ))}
    </div>
  )
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-4">
        {allStatuses.map(status => (
          <div key={status} className="flex items-center gap-4">
            <TrustAccountActionButton status={status} onClick={() => {}} />
          </div>
        ))}
      </div>
    </DirectionProvider>
  )
};
