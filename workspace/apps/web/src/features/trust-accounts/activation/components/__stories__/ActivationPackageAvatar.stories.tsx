import {PackageType} from '@sollapay/enums';

import {ActivationPackageAvatar} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof ActivationPackageAvatar> = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageAvatar',
  component: ActivationPackageAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    type: PackageType.TRUST_DETAILS
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: PackageType.TRUST_DETAILS
  }
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ActivationPackageAvatar type={PackageType.TRUST_DETAILS} />
      <ActivationPackageAvatar type={PackageType.COMPLIANCE} />
      <ActivationPackageAvatar type={PackageType.KYC} />
    </div>
  )
};

export const Dimmed: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ActivationPackageAvatar type={PackageType.TRUST_DETAILS} isDimmed />
      <ActivationPackageAvatar type={PackageType.COMPLIANCE} isDimmed />
      <ActivationPackageAvatar type={PackageType.KYC} isDimmed />
    </div>
  )
};
