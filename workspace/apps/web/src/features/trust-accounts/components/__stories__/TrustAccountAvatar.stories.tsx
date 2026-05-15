import {TrustPurpose} from '@sollapay/enums';

import {TrustAccountAvatar} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const allPurposes = Object.values(TrustPurpose);

const meta: Meta<typeof TrustAccountAvatar> = {
  title: 'Features/TrustAccounts/TrustAccountAvatar',
  component: TrustAccountAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    name: 'Riverside Towers Phase 1',
    trustPurpose: TrustPurpose.SEVEN_PERCENT
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSevenPercent: Story = {
  args: {
    trustPurpose: TrustPurpose.SEVEN_PERCENT
  }
};

export const WithOptions: Story = {
  args: {
    trustPurpose: TrustPurpose.OPTIONS
  }
};

export const WithoutPurpose: Story = {
  args: {
    trustPurpose: undefined
  }
};

export const AllPurposes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {allPurposes.map(purpose => (
        <div key={purpose} className="flex flex-col items-center gap-2">
          <TrustAccountAvatar name="Riverside Towers Phase 1" trustPurpose={purpose} />
          <span className="text-xs text-fg-secondary">{purpose}</span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2">
        <TrustAccountAvatar name="Riverside Towers Phase 1" trustPurpose={undefined} />
        <span className="text-xs text-fg-secondary">null (initials)</span>
      </div>
    </div>
  )
};
