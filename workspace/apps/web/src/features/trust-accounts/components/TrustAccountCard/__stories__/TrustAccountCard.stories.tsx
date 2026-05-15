import {ActivationStatus, OperationalStatus, TrustPurpose, TrustStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountCard} from '..';

import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

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

const meta = {
  title: 'Features/TrustAccounts/TrustAccountCard',
  component: TrustAccountCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    refId: 'TR-9100',
    name: 'Riverside Towers Phase 1',
    trustPurpose: TrustPurpose.SEVEN_PERCENT,
    trustType: '7% Account',
    date: new Date('2023-01-01'),
    status: TrustStatus.TRUST_ACTIVE,
    developerName: 'Acme Development Ltd.',
    account: createAccount(),
    onEditAccount: () => {},
    onDeleteAccount: () => {},
    onActionClick: () => {},
    className: undefined
  }
} satisfies Meta<typeof TrustAccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const allStatuses: {status: TrustStatus}[] = [
  {status: TrustStatus.SETUP_IN_PROGRESS},
  {status: TrustStatus.CLARIFICATION_REQUIRED},
  {status: TrustStatus.PENDING_VALIDATION},
  {status: TrustStatus.IN_REVIEW},
  {status: TrustStatus.TRUST_ACTIVE}
];

export const Default: Story = {
  args: {
    account: createAccount()
  }
};

export const WithBalance: Story = {
  args: {
    account: createAccount(),
    status: TrustStatus.TRUST_ACTIVE,
    balance: {balance: '1250000', currency: 'ILS'}
  }
};

export const AllStatuses: Story = {
  args: {
    account: createAccount({name: 'Riverside Towers'})
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {allStatuses.map(({status}) => (
        <TrustAccountCard
          key={status}
          refId="TR-9100"
          name="Riverside Towers"
          trustType="7% Account"
          date={new Date('2023-01-01')}
          status={status}
          developerName="Acme Development Ltd."
          account={createAccount({
            id: `trust-account-${status}`,
            name: 'Riverside Towers',
            trustStatus: status
          })}
          onEditAccount={() => {}}
          onDeleteAccount={() => {}}
          onActionClick={() => {}}
        />
      ))}
    </div>
  )
};

export const NoMenu: Story = {
  args: {
    account: createAccount({
      id: 'trust-account-2',
      refId: 'TR-4200',
      name: 'Sunset Heights',
      trustStatus: TrustStatus.SETUP_IN_PROGRESS,
      trustPurpose: TrustPurpose.OPTIONS,
      activationStatus: ActivationStatus.DRAFT,
      operationalStatus: OperationalStatus.SETUP,
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-15')
    }),
    refId: 'TR-4200',
    name: 'Sunset Heights',
    trustType: 'Options Account',
    date: new Date('2024-03-15'),
    status: TrustStatus.SETUP_IN_PROGRESS
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    account: createAccount({name: 'פרויקט נדליסטאר'}),
    refId: 'TR-9100',
    name: 'פרויקט נדליסטאר',
    trustType: 'חשבון 7%',
    date: new Date('2023-01-01'),
    status: TrustStatus.TRUST_ACTIVE
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {allStatuses.map(({status}) => (
        <TrustAccountCard
          key={status}
          refId="TR-9100"
          name="פרויקט נדליסטאר"
          trustType="חשבון 7%"
          date={new Date('2023-01-01')}
          status={status}
          developerName="חברת פיתוח לדוגמה"
          account={createAccount({
            id: `trust-account-rtl-${status}`,
            name: 'פרויקט נדליסטאר',
            trustStatus: status
          })}
          onEditAccount={() => {}}
          onDeleteAccount={() => {}}
          onActionClick={() => {}}
        />
      ))}
    </div>
  )
};
