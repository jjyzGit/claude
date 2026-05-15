import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerListSectionHeader} from '..';
import {DEFAULT_BUYER_FILTER_STATE} from '../../config/buyer-filter.config';

import type {BuyerFilterState} from '../../config/buyer-filter.config';
import type {ListSortingState, ListView} from '@sollapay/ui/components';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerListSectionHeader',
  component: BuyerListSectionHeader,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    searchText: '',
    onSearchChange: () => {},
    sorting: [],
    onSortingChange: () => {},
    view: 'card' as ListView,
    onViewChange: () => {},
    filter: DEFAULT_BUYER_FILTER_STATE,
    onFilterChange: () => {}
  }
} satisfies Meta<typeof BuyerListSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state — card view, no filters active */
export const Default: Story = {};

/** Table view */
export const TableView: Story = {
  args: {view: 'table' as ListView}
};

/** With active search text */
export const WithSearch: Story = {
  args: {searchText: 'כהן'}
};

/** With active sorting */
export const WithSorting: Story = {
  args: {sorting: [{id: 'fullName', desc: false}] satisfies ListSortingState}
};

/** With active payment status filter */
export const WithFilter: Story = {
  args: {
    filter: {
      ...DEFAULT_BUYER_FILTER_STATE,
      paymentStatuses: ['no_request', 'request_sent']
    } satisfies BuyerFilterState
  }
};

/** Interactive — controls wired up */
export const Interactive: Story = {
  render: args => {
    const [search, setSearch] = useState('');
    const [view, setView] = useState<ListView>('card');
    const [sorting, setSorting] = useState<ListSortingState>([]);
    const [filter, setFilter] = useState<BuyerFilterState>(DEFAULT_BUYER_FILTER_STATE);

    return (
      <BuyerListSectionHeader
        {...args}
        searchText={search}
        onSearchChange={setSearch}
        view={view}
        onViewChange={setView}
        sorting={sorting}
        onSortingChange={updater =>
          setSorting(prev => (typeof updater === 'function' ? updater(prev) : updater))
        }
        filter={filter}
        onFilterChange={setFilter}
      />
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
