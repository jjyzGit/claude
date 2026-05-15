import {withHebrew} from '@/stories/i18n-decorators';

import {
  mockTableRow,
  mockTableRowNoRequest,
  mockTableRowSent,
  MOCK_TRUST_ACCOUNT_ID
} from '../../__fixtures__/buyers.fixtures';
import {BuyerTable} from '../BuyerTable';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerTable',
  component: BuyerTable,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    rows: [mockTableRow, mockTableRowNoRequest, mockTableRowSent],
    sorting: [],
    onSortingChange: () => {},
    onRequestPayment: () => {},
    onViewBuyer: () => {},
    trustAccountId: MOCK_TRUST_ACCOUNT_ID
  }
} satisfies Meta<typeof BuyerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Multiple rows with different statuses */
export const Default: Story = {};

/** Empty table */
export const Empty: Story = {
  args: {rows: []}
};

/** Single row */
export const SingleRow: Story = {
  args: {rows: [mockTableRow]}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
