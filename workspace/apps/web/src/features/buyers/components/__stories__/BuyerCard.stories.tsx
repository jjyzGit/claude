import {withHebrew} from '@/stories/i18n-decorators';

import {
  mockBuyerDTO,
  mockTableRow,
  mockTableRowNoRequest,
  mockTableRowSent,
  MOCK_TRUST_ACCOUNT_ID
} from '../../__fixtures__/buyers.fixtures';
import {BuyerCard} from '../BuyerCard';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerCard',
  component: BuyerCard,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    row: mockTableRow,
    onRequestPayment: () => {},
    onViewBuyer: () => {},
    trustAccountId: MOCK_TRUST_ACCOUNT_ID
  }
} satisfies Meta<typeof BuyerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Completed deposit */
export const Completed: Story = {};

/** No payment request sent yet */
export const NoRequest: Story = {
  args: {row: mockTableRowNoRequest}
};

/** Payment request sent */
export const RequestSent: Story = {
  args: {row: mockTableRowSent}
};

/** Multiple buyers — badge triggers the group popover */
export const MultiBuyer: Story = {
  args: {
    row: {
      ...mockTableRow,
      buyers: [
        mockTableRow.buyers[0],
        {...mockBuyerDTO, id: 'buyer-2', fullName: 'יוסף לוי'},
        {...mockBuyerDTO, id: 'buyer-3', fullName: 'מיכל דוד'}
      ]
    }
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
