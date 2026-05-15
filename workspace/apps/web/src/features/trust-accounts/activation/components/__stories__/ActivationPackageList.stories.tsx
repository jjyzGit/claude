import {PackageStatus, PackageType} from '@sollapay/enums';
import {DirectionProvider} from '@sollapay/ui/providers';

import {ACTIVATION_PACKAGE_CONFIG} from '@/features/trust-accounts/activation/config';
import i18n from '@/lib/i18n/config';

import {ActivationPackageList} from '..';

import type {ActivationPackageConfig} from '@/features/trust-accounts/activation/config';
import type {ActivationPackageViewModel} from '@/features/trust-accounts/activation/hooks';
import type {PackageReadiness} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const readyReadiness: PackageReadiness = {
  isReady: true,
  totalCount: 5,
  missingCount: 0,
  missing: []
};

const partialReadiness: PackageReadiness = {
  isReady: false,
  totalCount: 5,
  missingCount: 2,
  missing: []
};

const emptyReadiness: PackageReadiness = {
  isReady: false,
  totalCount: 5,
  missingCount: 5,
  missing: []
};

const samplePackages: ActivationPackageViewModel[] = [
  {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: true,
    canSubmit: false,
    readiness: partialReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.COMPLIANCE,
    status: PackageStatus.SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: readyReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.KYC,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: emptyReadiness,
    clarificationRequests: null
  }
];

const allDraftPackages: ActivationPackageViewModel[] = [
  {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: true,
    canSubmit: false,
    readiness: emptyReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.COMPLIANCE,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: true,
    canSubmit: false,
    readiness: emptyReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.KYC,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: emptyReadiness,
    clarificationRequests: null
  }
];

const allApprovedPackages: ActivationPackageViewModel[] = [
  {
    type: PackageType.TRUST_DETAILS,
    status: PackageStatus.APPROVED,
    canEdit: false,
    canSubmit: false,
    readiness: readyReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.COMPLIANCE,
    status: PackageStatus.APPROVED,
    canEdit: false,
    canSubmit: false,
    readiness: readyReadiness,
    clarificationRequests: null
  },
  {
    type: PackageType.KYC,
    status: PackageStatus.NOT_SUBMITTED,
    canEdit: false,
    canSubmit: false,
    readiness: emptyReadiness,
    clarificationRequests: null
  }
];

const meta: Meta<typeof ActivationPackageList> = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageList',
  component: ActivationPackageList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    packageConfig: ACTIVATION_PACKAGE_CONFIG as Record<PackageType, ActivationPackageConfig>,
    onPackageNavigate: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    packages: samplePackages
  }
};

export const AllDraft: Story = {
  args: {
    packages: allDraftPackages
  }
};

export const AllApproved: Story = {
  args: {
    packages: allApprovedPackages
  }
};

export const SubmittedForReview: Story = {
  args: {
    packages: samplePackages,
    isSubmittedForReview: true
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    packages: samplePackages
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <ActivationPackageList {...args} />
      </div>
    </DirectionProvider>
  )
};
