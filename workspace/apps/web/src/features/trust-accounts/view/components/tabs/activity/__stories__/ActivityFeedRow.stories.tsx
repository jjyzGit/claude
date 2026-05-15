import {ActivityEntityType, TrustAccountActivityType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {ActivityFeedRow} from '..';

import type {TrustAccountActivityDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const baseActivity: TrustAccountActivityDTO = {
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
};

const meta = {
  title: 'Features/TrustAccounts/View/Activity/ActivityFeedRow',
  component: ActivityFeedRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    activity: baseActivity
  }
} satisfies Meta<typeof ActivityFeedRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuyerDeposit: Story = {};

export const BuyerWithdrawal: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.BUYER_WITHDRAWAL,
      metadata: {
        amountNis: '25000',
        referenceCode: null,
        senderName: 'ישראל ישראלי',
        purchaseId: 'purchase-1',
        instructionId: 'instruction-2'
      }
    }
  }
};

export const BuyerAdded: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.BUYER_ADDED,
      entityType: ActivityEntityType.PARTY,
      entityId: 'party-1',
      metadata: {
        buyerName: 'שרה ישראלי',
        unit: {id: 'unit-1', buildingNumber: '1', unitNumber: '5A'}
      }
    }
  }
};

export const BuyerRemoved: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.BUYER_REMOVED,
      entityType: ActivityEntityType.PARTY,
      entityId: 'party-2',
      metadata: {
        buyerName: 'שרה ישראלי',
        unit: {id: 'unit-1', buildingNumber: '1', unitNumber: '5A'}
      }
    }
  }
};

export const DocumentAdded: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.DOCUMENT_ADDED,
      entityType: ActivityEntityType.DOCUMENT,
      entityId: 'doc-1',
      metadata: {
        fileName: 'purchase-contract.pdf',
        documentType: 'signed_sale_agreement',
        documentContext: 'trust_details'
      }
    }
  }
};

export const DocumentUpdated: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.DOCUMENT_UPDATED,
      entityType: ActivityEntityType.DOCUMENT,
      entityId: 'doc-2',
      metadata: {
        fileName: 'purchase-contract-v2.pdf',
        documentType: 'signed_sale_agreement',
        documentContext: 'trust_details'
      }
    }
  }
};

export const DocumentRemoved: Story = {
  args: {
    activity: {
      ...baseActivity,
      activityType: TrustAccountActivityType.DOCUMENT_REMOVED,
      entityType: ActivityEntityType.DOCUMENT,
      entityId: 'doc-3',
      metadata: {
        fileName: 'old-contract.pdf',
        documentType: 'signed_sale_agreement'
      }
    }
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
