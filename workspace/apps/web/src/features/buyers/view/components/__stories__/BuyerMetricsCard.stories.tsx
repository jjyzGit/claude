import {withHebrew} from '@/stories/i18n-decorators';

import {
  mockPaymentCompleted,
  mockPaymentPending,
  mockPurchase
} from '../../../__fixtures__/buyers.fixtures';
import {BuyerMetricsCard} from '../BuyerMetricsCard';

import type {PaymentInstructionDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerMetricsCard',
  component: BuyerMetricsCard,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    purchase: mockPurchase,
    instructions: []
  }
} satisfies Meta<typeof BuyerMetricsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No payments yet — all zeros */
export const Empty: Story = {};

/** One completed payment (~30%) */
export const PartialProgress: Story = {
  args: {instructions: [mockPaymentCompleted]}
};

/** Completed + pending (~60% sent, ~30% completed) */
export const BothColumns: Story = {
  args: {instructions: [mockPaymentCompleted, mockPaymentPending]}
};

/** Fully collected — 100% green */
export const FullyCollected: Story = {
  args: {
    instructions: [
      {
        ...mockPaymentCompleted,
        id: 'payment-full',
        amountNis: '70000',
        percent: '7',
        status: 'completed' as PaymentInstructionDTO['status']
      }
    ]
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {instructions: [mockPaymentCompleted]}
};
