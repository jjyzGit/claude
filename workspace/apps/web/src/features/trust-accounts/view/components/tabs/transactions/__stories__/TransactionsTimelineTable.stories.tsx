import {
  InitiationMethod,
  TransactionDirection,
  TransactionGroupBy,
  TransactionStatus
} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {TransactionsTimelineTable} from '..';

import type {TrustAccountTransactionGroupDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof TransactionsTimelineTable> = {
  title: 'Features/TrustAccounts/View/TransactionsTimelineTable',
  component: TransactionsTimelineTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGroups: TrustAccountTransactionGroupDTO[] = [
  {
    groupKey: '2024-01-15',
    totalBalanceNis: '260000',
    transactionCount: 2,
    transactions: [
      {
        id: '1',
        amount: '130000',
        direction: TransactionDirection.CREDIT,
        currency: 'ILS',
        status: TransactionStatus.APPLIED,
        initiationMethod: InitiationMethod.RTP,
        buyerId: 'p1',
        buyerName: 'ישראל ישראלי',
        unit: {id: 'unit-1', buildingNumber: '1', unitNumber: '3'},
        percent: '5.2',
        effectiveDate: '2024-01-15T10:00:00Z',
        purchaseId: 'purchase-1'
      },
      {
        id: '2',
        amount: '130000',
        direction: TransactionDirection.CREDIT,
        currency: 'ILS',
        status: TransactionStatus.INFLIGHT,
        initiationMethod: InitiationMethod.MANUAL_BRANCH_TRANSFER,
        buyerId: 'p2',
        buyerName: 'שרה כהן',
        unit: {id: 'unit-2', buildingNumber: '1', unitNumber: '5'},
        percent: null,
        effectiveDate: '2024-01-15T14:00:00Z',
        purchaseId: 'purchase-2'
      }
    ]
  },
  {
    groupKey: '2024-01-10',
    totalBalanceNis: '130000',
    transactionCount: 1,
    transactions: [
      {
        id: '3',
        amount: '130000',
        direction: TransactionDirection.CREDIT,
        currency: 'ILS',
        status: TransactionStatus.APPLIED,
        initiationMethod: InitiationMethod.RTP,
        buyerId: 'p3',
        buyerName: 'דוד לוי',
        unit: {id: 'unit-3', buildingNumber: '1', unitNumber: '1'},
        percent: '5.0',
        effectiveDate: '2024-01-10T09:00:00Z',
        purchaseId: 'purchase-3'
      }
    ]
  }
];

export const WithData: Story = {
  args: {
    groups: mockGroups,
    groupBy: TransactionGroupBy.DATE
  },
  decorators: [withHebrew]
};

export const Empty: Story = {
  args: {
    groups: [],
    groupBy: TransactionGroupBy.DATE
  },
  decorators: [withHebrew]
};
