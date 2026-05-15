import {TrustStatus} from '@sollapay/enums';

import {withEnglish, withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountViewBalanceMetric} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountViewBalanceMetric',
  component: TrustAccountViewBalanceMetric,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    status: TrustStatus.TRUST_ACTIVE,
    balance: {
      balance: '4325000',
      creditBalance: '4325000',
      debitBalance: '0',
      inflightBalance: '0',
      inflightCreditBalance: '0',
      inflightDebitBalance: '0',
      currency: 'ILS'
    }
  }
} satisfies Meta<typeof TrustAccountViewBalanceMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withHebrew]
};

export const LargeAmount: Story = {
  decorators: [withHebrew],
  args: {
    balance: {
      balance: '54200000',
      creditBalance: '54200000',
      debitBalance: '0',
      inflightBalance: '0',
      inflightCreditBalance: '0',
      inflightDebitBalance: '0',
      currency: 'ILS'
    }
  }
};

export const Inactive: Story = {
  decorators: [withHebrew],
  args: {status: TrustStatus.SETUP_IN_PROGRESS}
};

export const English: Story = {
  decorators: [withEnglish]
};
