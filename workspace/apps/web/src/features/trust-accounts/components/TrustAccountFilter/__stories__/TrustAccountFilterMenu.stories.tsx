import {TrustPurpose, TrustStatus} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountFilterMenu} from '..';
import {DEFAULT_FILTER_STATE} from '../../../config/filter.config';

import type {TrustAccountFilterState} from '../../../utils/filter.utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountFilterMenu',
  component: TrustAccountFilterMenu,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    filter: DEFAULT_FILTER_STATE,
    onChange: () => {}
  }
} satisfies Meta<typeof TrustAccountFilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All filters in their default (cleared) state */
export const Default: Story = {};

/** Some filters pre-selected */
export const WithActiveFilters: Story = {
  args: {
    filter: {
      statuses: [TrustStatus.TRUST_ACTIVE, TrustStatus.IN_REVIEW],
      purposes: [TrustPurpose.SEVEN_PERCENT],
      createdAt: '30d',
      dateRange: undefined
    }
  }
};

/** Interactive — all filter sections update live */
export const Interactive: Story = {
  render: args => {
    const [filter, setFilter] = useState<TrustAccountFilterState>(DEFAULT_FILTER_STATE);
    return (
      <div className="flex gap-6 items-start">
        <TrustAccountFilterMenu {...args} filter={filter} onChange={setFilter} />
        <pre className="min-w-[220px] rounded-md border border-border p-3 text-xs font-mono">
          {JSON.stringify(filter, null, 2)}
        </pre>
      </div>
    );
  }
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    filter: {
      statuses: [TrustStatus.TRUST_ACTIVE],
      purposes: [],
      createdAt: '7d',
      dateRange: undefined
    }
  }
};
