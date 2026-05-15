import {ActivationStatus, OperationalStatus, TrustPurpose, TrustStatus} from '@sollapay/enums';
import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {TrustAccountTable} from '..';

import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {ListOnSortingChange, ListSortingState} from '@sollapay/ui/components';
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

const mockAccounts: TrustAccountListItemDTO[] = [
  createAccount({
    id: '1',
    refId: 'TR-9100',
    name: 'Riverside Towers',
    trustStatus: TrustStatus.TRUST_ACTIVE
  }),
  createAccount({
    id: '2',
    refId: 'TR-4200',
    name: 'Sunset Heights',
    trustStatus: TrustStatus.SETUP_IN_PROGRESS,
    trustPurpose: TrustPurpose.OPTIONS
  }),
  createAccount({
    id: '3',
    refId: 'TR-7800',
    name: 'Harbor View',
    trustStatus: TrustStatus.IN_REVIEW
  })
];

const noopSortingChange: ListOnSortingChange = () => {};

const meta: Meta<typeof TrustAccountTable> = {
  title: 'Features/TrustAccounts/TrustAccountTable',
  component: TrustAccountTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    accounts: mockAccounts,
    sorting: [] satisfies ListSortingState,
    onSortingChange: noopSortingChange,
    onEditAccount: () => {},
    onDeleteAccount: () => {},
    onAccountActionClick: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    accounts: []
  }
};

export const WithSorting: Story = {
  args: {
    sorting: [{id: 'createdAt', desc: true}] satisfies ListSortingState
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    accounts: [
      createAccount({
        id: '1',
        refId: 'TR-9100',
        name: 'מגדלי ריברסייד',
        trustStatus: TrustStatus.TRUST_ACTIVE
      }),
      createAccount({
        id: '2',
        refId: 'TR-4200',
        name: 'גבעות השקיעה',
        trustStatus: TrustStatus.SETUP_IN_PROGRESS,
        trustPurpose: TrustPurpose.OPTIONS
      }),
      createAccount({
        id: '3',
        refId: 'TR-7800',
        name: 'נוף הנמל',
        trustStatus: TrustStatus.IN_REVIEW
      })
    ]
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <TrustAccountTable {...args} />
      </div>
    </DirectionProvider>
  )
};
