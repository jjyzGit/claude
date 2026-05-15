import {DeveloperType, RelationshipType, TrustStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountViewHeader} from '..';

import type {TrustAccountViewHeaderProps} from '..';
import type {Meta, StoryObj} from '@storybook/react-vite';

const defaultArgs: TrustAccountViewHeaderProps = {
  trustAccountId: 'trust-account-1',
  name: 'Riverside Towers Phase 1',
  refId: 'TR-9100',
  status: TrustStatus.TRUST_ACTIVE,
  balance: {
    balance: '4325000',
    creditBalance: '4325000',
    debitBalance: '0',
    inflightBalance: '0',
    inflightCreditBalance: '0',
    inflightDebitBalance: '0',
    currency: 'ILS'
  },
  purpose: '7% Account',
  developerDetails: {
    developerType: DeveloperType.CORPORATION,
    relationshipType: RelationshipType.FEW_PROJECTS,
    metFaceToFace: true,
    fullName: 'Acme Development Ltd.',
    idNumber: '435345345',
    establishedDate: null,
    address: '45 Herzl St, Tel Aviv'
  },
  activeTab: 'overview',
  buyersCount: 0,
  transactionsCount: 12,
  documentsCount: 4,
  beneficiariesCount: 2,
  onTabChange: () => {}
};

const meta = {
  title: 'Features/TrustAccounts/TrustAccountViewHeader',
  component: TrustAccountViewHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: defaultArgs
} satisfies Meta<typeof TrustAccountViewHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BuyersTabActive: Story = {
  args: {
    activeTab: 'buyers'
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    name: 'פרויקט אמרלד טאורס',
    refId: 'TR-9100',
    purpose: 'מכר יזם',
    developerDetails: {
      developerType: DeveloperType.CORPORATION,
      relationshipType: RelationshipType.FEW_PROJECTS,
      metFaceToFace: true,
      fullName: 'אמרלד גלובל בע"מ',
      idNumber: '435345345',
      establishedDate: null,
      address: 'הרצל 45, תל אביב'
    },
    activeTab: 'overview',
    buyersCount: 3,
    transactionsCount: 12,
    documentsCount: 4,
    beneficiariesCount: 2,
    onTabChange: () => {}
  }
};
