import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerCardList} from '..';
import {
  mockTableRow,
  mockTableRowNoRequest,
  mockTableRowSent,
  MOCK_TRUST_ACCOUNT_ID
} from '../../__fixtures__/buyers.fixtures';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerCardList',
  component: BuyerCardList,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    rows: [mockTableRow, mockTableRowNoRequest, mockTableRowSent],
    onRequestPayment: () => {},
    onViewBuyer: () => {},
    trustAccountId: MOCK_TRUST_ACCOUNT_ID
  }
} satisfies Meta<typeof BuyerCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Multiple rows with different statuses */
export const Default: Story = {};

/** Single card */
export const SingleCard: Story = {
  args: {rows: [mockTableRow]}
};

/** Empty list */
export const Empty: Story = {
  args: {rows: []}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
