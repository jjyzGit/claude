import {TrustStatus} from '@sollapay/enums';

import i18n from '@/lib/i18n/config';

import {TrustAccountBadge} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withEnglish = (Story: ComponentType) => {
  i18n.changeLanguage('en');
  return <Story />;
};

const allStatuses = Object.values(TrustStatus);

const meta: Meta<typeof TrustAccountBadge> = {
  title: 'Features/TrustAccounts/TrustAccountBadge',
  component: TrustAccountBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [withEnglish],
  args: {
    status: TrustStatus.TRUST_ACTIVE
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: TrustStatus.TRUST_ACTIVE
  }
};

export const InlineActiveWithSubtitle: Story = {
  args: {
    status: TrustStatus.TRUST_ACTIVE,
    subtitleLayout: 'inline'
  }
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {allStatuses.map(status => (
        <div key={status} className="flex items-center gap-4">
          <span className="w-48 shrink-0 text-sm text-fg-secondary">{status}</span>
          <TrustAccountBadge status={status} />
        </div>
      ))}
    </div>
  )
};
