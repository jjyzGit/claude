import {PackageStatus, PackageType} from '@sollapay/enums';

import {ActivationPackageRow} from '..';

import type {PackageReadiness} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const defaultReadiness: PackageReadiness = {
  isReady: false,
  totalCount: 5,
  missingCount: 3,
  missing: []
};

const partialReadiness: PackageReadiness = {
  isReady: false,
  totalCount: 5,
  missingCount: 2,
  missing: []
};

const completeReadiness: PackageReadiness = {
  isReady: true,
  totalCount: 5,
  missingCount: 0,
  missing: []
};

const meta: Meta<typeof ActivationPackageRow> = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageRow',
  component: ActivationPackageRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    onNavigate: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = {
  args: {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: true,
    canSubmit: false,
    readiness: partialReadiness
  }
};

export const ReadyToSubmit: Story = {
  args: {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: true,
    canSubmit: true,
    readiness: completeReadiness
  }
};

export const Submitted: Story = {
  args: {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: completeReadiness
  }
};

export const InReview: Story = {
  args: {
    type: PackageType.COMPLIANCE,
    status: PackageStatus.IN_REVIEW,
    canEdit: false,
    canSubmit: false,
    readiness: completeReadiness
  }
};

export const Approved: Story = {
  args: {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.APPROVED,
    canEdit: false,
    canSubmit: false,
    readiness: completeReadiness
  }
};

export const Optional: Story = {
  args: {
    type: PackageType.KYC,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: defaultReadiness
  }
};
