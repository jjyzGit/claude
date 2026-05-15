import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerFilterMenu} from '..';
import {DEFAULT_BUYER_FILTER_STATE} from '../../../config/buyer-filter.config';

import type {BuyerFilterState} from '../../../config/buyer-filter.config';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerFilterMenu',
  component: BuyerFilterMenu,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    filter: DEFAULT_BUYER_FILTER_STATE,
    onChange: () => {}
  }
} satisfies Meta<typeof BuyerFilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — no active filters */
export const Default: Story = {
  render: args => (
    <div className="w-[280px] rounded-md border border-border-subtle bg-background-surface shadow-md">
      <BuyerFilterMenu {...args} />
    </div>
  )
};

/** With active payment status filters */
export const WithActiveFilters: Story = {
  args: {
    filter: {
      ...DEFAULT_BUYER_FILTER_STATE,
      paymentStatuses: ['no_request', 'completed'],
      createdAt: '30d'
    } satisfies BuyerFilterState
  },
  render: args => (
    <div className="w-[280px] rounded-md border border-border-subtle bg-background-surface shadow-md">
      <BuyerFilterMenu {...args} />
    </div>
  )
};

/** Interactive — all controls wired up */
export const Interactive: Story = {
  render: args => {
    const [filter, setFilter] = useState<BuyerFilterState>(DEFAULT_BUYER_FILTER_STATE);
    return (
      <div className="w-[280px] rounded-md border border-border-subtle bg-background-surface shadow-md">
        <BuyerFilterMenu {...args} filter={filter} onChange={setFilter} />
      </div>
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => (
    <div className="w-[280px] rounded-md border border-border-subtle bg-background-surface shadow-md">
      <BuyerFilterMenu {...args} />
    </div>
  )
};
