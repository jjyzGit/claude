import {ActivationStatus, OperationalStatus, TrustPurpose, TrustStatus} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {ActivationPageHeaderSection} from '..';

import type {TrustAccountSkeletonDraftDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const baseTrustAccount: TrustAccountSkeletonDraftDTO = {
  id: 'trust-account-1',
  refId: 'TR-9100',
  name: 'Riverside Towers Phase 1',
  lawyerId: 'lawyer-1',
  developerName: 'Acme Development Ltd.',
  trustStatus: TrustStatus.SETUP_IN_PROGRESS,
  activationStatus: ActivationStatus.DRAFT,
  operationalStatus: OperationalStatus.SETUP,
  trustPurpose: TrustPurpose.SEVEN_PERCENT,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-06-01T12:00:00Z'
};

const meta = {
  title: 'Features/TrustAccounts/Activation/ActivationPageHeaderSection',
  component: ActivationPageHeaderSection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    trustAccount: baseTrustAccount
  }
} satisfies Meta<typeof ActivationPageHeaderSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    trustAccount: undefined
  }
};

export const PendingValidation: Story = {
  args: {
    trustAccount: {
      ...baseTrustAccount,
      trustStatus: TrustStatus.PENDING_VALIDATION,
      activationStatus: ActivationStatus.SUBMITTED_FOR_REVIEW
    }
  }
};

export const NoPurpose: Story = {
  args: {
    trustAccount: {
      ...baseTrustAccount,
      trustPurpose: undefined
    }
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    trustAccount: {
      ...baseTrustAccount,
      name: 'פרויקט אמרלד טאורס',
      refId: 'TR-9101'
    }
  }
};
