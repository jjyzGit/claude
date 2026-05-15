import {withHebrew} from '@/stories/i18n-decorators';

import {
  MOCK_TRUST_ACCOUNT_ID,
  mockPaymentCompleted,
  mockPaymentPending,
  mockPurchase,
  mockPurchase2
} from '../../../__fixtures__/buyers.fixtures';
import {BuyerUnitContent} from '../BuyerUnitContent';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerUnitContent',
  component: BuyerUnitContent,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    purchase: mockPurchase,
    instructions: [],
    trustAccountId: MOCK_TRUST_ACCOUNT_ID,
    buyerId: 'buyer-1',
    onRequestPayment: () => {}
  }
} satisfies Meta<typeof BuyerUnitContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty payment history, no documents */
export const EmptyState: Story = {
  args: {purchase: mockPurchase2}
};

/** With payments and documents */
export const WithData: Story = {
  args: {
    instructions: [mockPaymentCompleted, mockPaymentPending]
  }
};

/** CTA hidden when payment not allowed */
export const PaymentDisabled: Story = {
  args: {
    instructions: [mockPaymentCompleted],
    requestPaymentDisabled: true
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {instructions: [mockPaymentCompleted]}
};
