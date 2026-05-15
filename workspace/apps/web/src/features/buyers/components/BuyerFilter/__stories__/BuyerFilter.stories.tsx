import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerFilter} from '..';
import {DEFAULT_BUYER_FILTER_STATE} from '../../../config/buyer-filter.config';

import type {BuyerFilterState} from '../../../config/buyer-filter.config';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerFilter',
  component: BuyerFilter,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    filter: DEFAULT_BUYER_FILTER_STATE,
    onChange: () => {}
  }
} satisfies Meta<typeof BuyerFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No active filters */
export const Default: Story = {};

/** With active filters — badge shows count */
export const WithActiveFilters: Story = {
  args: {
    filter: {
      ...DEFAULT_BUYER_FILTER_STATE,
      paymentStatuses: ['no_request', 'completed']
    } satisfies BuyerFilterState
  }
};

/** Disabled state */
export const Disabled: Story = {
  args: {disabled: true}
};

/** Interactive — filter state updates reflected in badge count */
export const Interactive: Story = {
  render: args => {
    const [filter, setFilter] = useState<BuyerFilterState>(DEFAULT_BUYER_FILTER_STATE);
    return <BuyerFilter {...args} filter={filter} onChange={setFilter} />;
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
