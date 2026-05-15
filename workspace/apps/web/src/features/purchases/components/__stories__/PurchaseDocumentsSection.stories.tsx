import {withHebrew} from '@/stories/i18n-decorators';

import {
  MOCK_PURCHASE_ID,
  MOCK_TRUST_ACCOUNT_ID,
  mockPurchase
} from '../../../buyers/__fixtures__/buyers.fixtures';
import {PurchaseDocumentsSection} from '../PurchaseDocumentsSection';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Purchases/PurchaseDocumentsSection',
  component: PurchaseDocumentsSection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    documents: mockPurchase.documents,
    trustAccountId: MOCK_TRUST_ACCOUNT_ID,
    buyerId: 'buyer-1',
    purchaseId: MOCK_PURCHASE_ID
  }
} satisfies Meta<typeof PurchaseDocumentsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Two documents */
export const WithDocuments: Story = {};

/** Empty state */
export const Empty: Story = {
  args: {documents: []}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
