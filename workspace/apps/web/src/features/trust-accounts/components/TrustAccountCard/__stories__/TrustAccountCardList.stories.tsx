import {ActivationStatus, OperationalStatus, TrustPurpose, TrustStatus} from '@sollapay/enums';
import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {TrustAccountCardList} from '..';

import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const createAccount = (
  overrides: Partial<TrustAccountListItemDTO> = {}
): TrustAccountListItemDTO => ({
  id: 'trust-account-1',
  refId: 'TR-9100',
  name: 'Riverside Towers Phase 1',
  lawyerId: 'lawyer-1',
  developerName: null,
  trustStatus: TrustStatus.TRUST_ACTIVE,
  activationStatus: ActivationStatus.APPROVED,
  operationalStatus: OperationalStatus.OPEN,
  trustPurpose: TrustPurpose.SEVEN_PERCENT,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  ...overrides
});

const defaultAccounts: TrustAccountListItemDTO[] = [
  createAccount({
    id: 'trust-account-1',
    refId: 'TR-9100',
    name: 'Riverside Towers Phase 1',
    trustStatus: TrustStatus.TRUST_ACTIVE,
    trustPurpose: TrustPurpose.SEVEN_PERCENT
  }),
  createAccount({
    id: 'trust-account-2',
    refId: 'TR-4200',
    name: 'Sunset Heights',
    trustStatus: TrustStatus.PENDING_VALIDATION,
    trustPurpose: TrustPurpose.OPTIONS,
    activationStatus: ActivationStatus.SUBMITTED_FOR_REVIEW,
    operationalStatus: OperationalStatus.SETUP,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  }),
  createAccount({
    id: 'trust-account-3',
    refId: 'TR-7700',
    name: 'Harbor View Residences',
    trustStatus: TrustStatus.SETUP_IN_PROGRESS,
    trustPurpose: undefined,
    activationStatus: ActivationStatus.DRAFT,
    operationalStatus: OperationalStatus.SETUP,
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20')
  })
];

const allStatusAccounts: TrustAccountListItemDTO[] = Object.values(TrustStatus).map(
  (status, index) =>
    createAccount({
      id: `trust-account-status-${status}`,
      refId: `TR-${1000 + index * 100}`,
      name: `Account ${status}`,
      trustStatus: status
    })
);

const meta = {
  title: 'Features/TrustAccounts/TrustAccountCardList',
  component: TrustAccountCardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    accounts: defaultAccounts,
    onEditAccount: () => {},
    onDeleteAccount: () => {},
    onAccountActionClick: () => {}
  }
} satisfies Meta<typeof TrustAccountCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accounts: defaultAccounts
  }
};

export const Empty: Story = {
  args: {
    accounts: []
  }
};

export const SingleAccount: Story = {
  args: {
    accounts: [defaultAccounts[0] as TrustAccountListItemDTO]
  }
};

export const MixedStatuses: Story = {
  args: {
    accounts: allStatusAccounts
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <TrustAccountCardList
          accounts={[
            createAccount({
              id: 'trust-account-rtl-1',
              name: 'פרויקט נדליסטאר',
              trustStatus: TrustStatus.TRUST_ACTIVE,
              trustPurpose: TrustPurpose.SEVEN_PERCENT
            }),
            createAccount({
              id: 'trust-account-rtl-2',
              name: 'מגדלי הרצל',
              trustStatus: TrustStatus.PENDING_VALIDATION,
              trustPurpose: TrustPurpose.OPTIONS,
              activationStatus: ActivationStatus.SUBMITTED_FOR_REVIEW,
              operationalStatus: OperationalStatus.SETUP
            }),
            createAccount({
              id: 'trust-account-rtl-3',
              name: 'שכונת הכרמל',
              trustStatus: TrustStatus.SETUP_IN_PROGRESS,
              trustPurpose: undefined,
              activationStatus: ActivationStatus.DRAFT,
              operationalStatus: OperationalStatus.SETUP
            })
          ]}
          onEditAccount={() => {}}
          onDeleteAccount={() => {}}
          onAccountActionClick={() => {}}
        />
      </div>
    </DirectionProvider>
  )
};
