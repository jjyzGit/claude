import {ActivityEntityType, TrustAccountActivityType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {ActivityFeedTable} from '..';

import type {TrustAccountActivityDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const mockActivities: TrustAccountActivityDTO[] = [
  {
    id: 'act-1',
    trustAccountId: 'trust-1',
    activityType: TrustAccountActivityType.BUYER_DEPOSIT,
    entityId: 'payin-1',
    entityType: ActivityEntityType.PAYIN,
    metadata: {
      amountNis: '87500',
      referenceCode: 'REF-00123',
      senderName: 'ישראל ישראלי',
      purchaseId: 'purchase-1',
      instructionId: 'instruction-1'
    },
    createdAt: '2026-04-15T10:30:00.000Z'
  },
  {
    id: 'act-2',
    trustAccountId: 'trust-1',
    activityType: TrustAccountActivityType.BUYER_ADDED,
    entityId: 'party-2',
    entityType: ActivityEntityType.PARTY,
    metadata: {
      buyerName: 'שרה כהן',
      unit: {id: 'unit-2', buildingNumber: '1', unitNumber: '8C'}
    },
    createdAt: '2026-04-14T14:20:00.000Z'
  },
  {
    id: 'act-3',
    trustAccountId: 'trust-1',
    activityType: TrustAccountActivityType.DOCUMENT_ADDED,
    entityId: 'doc-1',
    entityType: ActivityEntityType.DOCUMENT,
    metadata: {
      fileName: 'purchase-contract.pdf',
      documentType: 'signed_sale_agreement'
    },
    createdAt: '2026-04-13T09:15:00.000Z'
  },
  {
    id: 'act-4',
    trustAccountId: 'trust-1',
    activityType: TrustAccountActivityType.BUYER_DEPOSIT,
    entityId: 'payin-4',
    entityType: ActivityEntityType.PAYIN,
    metadata: {
      amountNis: '120000',
      referenceCode: 'REF-00456',
      senderName: 'דן לוי',
      purchaseId: 'purchase-3',
      instructionId: 'instruction-4'
    },
    createdAt: '2026-04-12T16:45:00.000Z'
  }
];

const meta = {
  title: 'Features/TrustAccounts/View/Activity/ActivityFeedTable',
  component: ActivityFeedTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    activities: mockActivities,
    loadedCount: mockActivities.length,
    total: mockActivities.length
  }
} satisfies Meta<typeof ActivityFeedTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PartiallyLoaded: Story = {
  args: {
    loadedCount: mockActivities.length,
    total: 38
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
