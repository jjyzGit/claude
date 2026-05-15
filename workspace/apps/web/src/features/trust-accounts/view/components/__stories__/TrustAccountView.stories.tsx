import {DeveloperType, RelationshipType, TrustStatus} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountView} from '..';

import type {TrustAccountViewProps} from '..';
import type {TrustAccountViewTab} from '@/features/trust-accounts/view/utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

const defaultArgs: Omit<TrustAccountViewProps, 'activeTab' | 'onTabChange'> = {
  id: 'story-trust-account-id',
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
  }
};

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountView',
  component: TrustAccountView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    ...defaultArgs,
    activeTab: 'overview',
    onTabChange: () => {}
  }
} satisfies Meta<typeof TrustAccountView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [activeTab, setActiveTab] = useState<TrustAccountViewTab>(args.activeTab);
    return <TrustAccountView {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: args => {
    const [activeTab, setActiveTab] = useState<TrustAccountViewTab>(args.activeTab);
    return <TrustAccountView {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  }
};
