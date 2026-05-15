import {InitiationMethod, PaymentInstructionStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {mockPaymentCompleted, mockPaymentPending} from '../../../__fixtures__/buyers.fixtures';
import {BuyerPaymentHistoryTable} from '../BuyerPaymentHistoryTable';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerPaymentHistoryTable',
  component: BuyerPaymentHistoryTable,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {instructions: []}
} satisfies Meta<typeof BuyerPaymentHistoryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No instructions — empty state */
export const Empty: Story = {};

/** Mix of statuses */
export const WithData: Story = {
  args: {
    instructions: [
      mockPaymentCompleted,
      mockPaymentPending,
      {
        ...mockPaymentCompleted,
        id: 'p3',
        status: PaymentInstructionStatus.FAILED,
        initiationMethod: InitiationMethod.RTP,
        referenceCode: 'REF-0011'
      },
      {
        ...mockPaymentCompleted,
        id: 'p4',
        status: PaymentInstructionStatus.CANCELLED,
        referenceCode: 'REF-0012'
      }
    ]
  }
};

/** RTL — all possible statuses */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    instructions: [
      {
        ...mockPaymentCompleted,
        id: 's1',
        status: PaymentInstructionStatus.COMPLETED,
        referenceCode: 'REF-1001'
      },
      {
        ...mockPaymentCompleted,
        id: 's2',
        status: PaymentInstructionStatus.PARTIALLY_MATCHED,
        referenceCode: 'REF-1002'
      },
      {
        ...mockPaymentPending,
        id: 's3',
        status: PaymentInstructionStatus.PENDING_EXECUTION,
        referenceCode: 'REF-1003'
      },
      {
        ...mockPaymentPending,
        id: 's4',
        status: PaymentInstructionStatus.AWAITING_FUNDS,
        initiationMethod: InitiationMethod.RTP,
        referenceCode: 'REF-1004'
      },
      {
        ...mockPaymentCompleted,
        id: 's5',
        status: PaymentInstructionStatus.FAILED,
        referenceCode: 'REF-1005'
      },
      {
        ...mockPaymentCompleted,
        id: 's6',
        status: PaymentInstructionStatus.CANCELLED,
        referenceCode: 'REF-1006'
      },
      {
        ...mockPaymentCompleted,
        id: 's7',
        status: PaymentInstructionStatus.EXPIRED,
        referenceCode: 'REF-1007'
      }
    ]
  }
};
