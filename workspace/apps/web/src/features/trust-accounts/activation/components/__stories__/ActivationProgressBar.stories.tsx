import {PackageStatus, PackageType} from '@sollapay/enums';
import {DirectionProvider} from '@sollapay/ui/providers';

import i18n from '@/lib/i18n/config';

import {ActivationProgressBar} from '..';

import type {PackageReadiness} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ComponentType} from 'react';

const withHebrew = (Story: ComponentType) => {
  i18n.changeLanguage('he');
  return <Story />;
};

const meta: Meta<typeof ActivationProgressBar> = {
  title: 'Features/TrustAccounts/Activation/ActivationProgressBar',
  component: ActivationProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const ProgressBarWrapper = ({children}: {children: React.ReactNode}) => (
  <div style={{position: 'relative', width: '400px', height: '4px'}}>{children}</div>
);

const notReady: PackageReadiness = {isReady: false, totalCount: 5, missingCount: 5, missing: []};
const ready: PackageReadiness = {isReady: true, totalCount: 5, missingCount: 0, missing: []};

export const Default: Story = {
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.NOT_SUBMITTED, readiness: notReady},
      {type: PackageType.COMPLIANCE, status: PackageStatus.NOT_SUBMITTED, readiness: notReady},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <ProgressBarWrapper>
      <ActivationProgressBar {...args} />
    </ProgressBarWrapper>
  )
};

export const HalfReady: Story = {
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.NOT_SUBMITTED, readiness: ready},
      {type: PackageType.COMPLIANCE, status: PackageStatus.NOT_SUBMITTED, readiness: notReady},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <ProgressBarWrapper>
      <ActivationProgressBar {...args} />
    </ProgressBarWrapper>
  )
};

export const AllReady: Story = {
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.NOT_SUBMITTED, readiness: ready},
      {type: PackageType.COMPLIANCE, status: PackageStatus.NOT_SUBMITTED, readiness: ready},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <ProgressBarWrapper>
      <ActivationProgressBar {...args} />
    </ProgressBarWrapper>
  )
};

export const AllSubmitted: Story = {
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.SUBMITTED, readiness: ready},
      {type: PackageType.COMPLIANCE, status: PackageStatus.SUBMITTED, readiness: ready},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <ProgressBarWrapper>
      <ActivationProgressBar {...args} />
    </ProgressBarWrapper>
  )
};

export const AllApproved: Story = {
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.APPROVED, readiness: ready},
      {type: PackageType.COMPLIANCE, status: PackageStatus.APPROVED, readiness: ready},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <ProgressBarWrapper>
      <ActivationProgressBar {...args} />
    </ProgressBarWrapper>
  )
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    packages: [
      {type: PackageType.TRUST_DETAILS, status: PackageStatus.NOT_SUBMITTED, readiness: ready},
      {type: PackageType.COMPLIANCE, status: PackageStatus.NOT_SUBMITTED, readiness: notReady},
      {type: PackageType.KYC, status: PackageStatus.NOT_SUBMITTED, readiness: notReady}
    ]
  },
  render: args => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <ProgressBarWrapper>
          <ActivationProgressBar {...args} />
        </ProgressBarWrapper>
      </div>
    </DirectionProvider>
  )
};
