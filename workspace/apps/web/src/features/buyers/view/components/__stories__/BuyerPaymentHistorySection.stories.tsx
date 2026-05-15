import {PaymentInstructionStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {mockPaymentCompleted, mockPaymentPending} from '../../../__fixtures__/buyers.fixtures';
import {BuyerPaymentHistorySection} from '../BuyerPaymentHistorySection';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerPaymentHistorySection',
  component: BuyerPaymentHistorySection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    instructions: [],
    unitLabel: 'Building 1 Unit 121',
    onRequestPayment: () => {}
  }
} satisfies Meta<typeof BuyerPaymentHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty — shows empty state with illustration */
export const Empty: Story = {};

/** With payment instructions */
export const WithData: Story = {
  args: {
    instructions: [
      mockPaymentCompleted,
      mockPaymentPending,
      {
        ...mockPaymentCompleted,
        id: 'p3',
        status: PaymentInstructionStatus.FAILED,
        referenceCode: 'REF-0011'
      }
    ]
  }
};

/** Payment button disabled — balance fully collected */
export const PaymentDisabled: Story = {
  args: {
    instructions: [mockPaymentCompleted],
    requestPaymentDisabled: true
  }
};

/** No payment handler — button not shown */
export const NoPaymentAction: Story = {
  args: {
    instructions: [mockPaymentCompleted],
    onRequestPayment: undefined
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {instructions: [mockPaymentCompleted, mockPaymentPending]}
};
