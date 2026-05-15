import {InitiationMethod, TransactionDirection, TransactionStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {TransactionRow} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof TransactionRow> = {
  title: 'Features/TrustAccounts/View/TransactionRow',
  component: TransactionRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  id: '1',
  amount: '130000',
  currency: 'ILS',
  effectiveDate: new Date().toISOString(),
  buyerId: 'p1',
  buyerName: 'ישראל ישראלי',
  unit: {id: 'unit-1', buildingNumber: '1', unitNumber: '3'},
  percent: '5.2',
  purchaseId: 'purchase-1'
};

export const Applied: Story = {
  args: {
    transaction: {
      ...base,
      direction: TransactionDirection.CREDIT,
      status: TransactionStatus.APPLIED,
      initiationMethod: InitiationMethod.RTP
    }
  },
  decorators: [withHebrew]
};

export const Inflight: Story = {
  args: {
    transaction: {
      ...base,
      direction: TransactionDirection.CREDIT,
      status: TransactionStatus.INFLIGHT,
      initiationMethod: InitiationMethod.RTP
    }
  },
  decorators: [withHebrew]
};

export const Standalone: Story = {
  args: {
    transaction: {
      ...base,
      direction: TransactionDirection.CREDIT,
      status: TransactionStatus.APPLIED,
      initiationMethod: InitiationMethod.MANUAL_BRANCH_TRANSFER
    }
  },
  decorators: [withHebrew]
};

export const NoInitiationMethod: Story = {
  args: {
    transaction: {
      ...base,
      direction: TransactionDirection.CREDIT,
      status: TransactionStatus.APPLIED,
      initiationMethod: null
    }
  },
  decorators: [withHebrew]
};
