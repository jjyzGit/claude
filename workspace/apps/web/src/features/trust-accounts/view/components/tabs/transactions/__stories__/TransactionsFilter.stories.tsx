import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TransactionsFilter, DEFAULT_TRANSACTIONS_FILTER_STATE} from '..';

import type {TransactionsFilterState} from '../config/transactions-filter.config';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof TransactionsFilter> = {
  title: 'Features/TrustAccounts/View/TransactionsFilter',
  component: TransactionsFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [filter, setFilter] = useState<TransactionsFilterState>(
      DEFAULT_TRANSACTIONS_FILTER_STATE
    );
    return <TransactionsFilter filter={filter} onChange={setFilter} />;
  },
  args: {
    filter: DEFAULT_TRANSACTIONS_FILTER_STATE,
    onChange: () => {}
  },
  decorators: [withHebrew]
};

export const Disabled: Story = {
  args: {
    filter: DEFAULT_TRANSACTIONS_FILTER_STATE,
    onChange: () => {},
    disabled: true
  },
  decorators: [withHebrew]
};
