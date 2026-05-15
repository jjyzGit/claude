import {InitiationMethod} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {PaymentInitiationMethodBadge} from '../PaymentInitiationMethodBadge';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/PaymentInitiationMethodBadge',
  component: PaymentInitiationMethodBadge,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    method: {
      control: 'select',
      options: Object.values(InitiationMethod)
    }
  }
} satisfies Meta<typeof PaymentInitiationMethodBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** RTP — Payment Initiation */
export const RTP: Story = {
  args: {method: InitiationMethod.RTP}
};

/** Manual Branch Transfer — Independent Payment */
export const ManualBranchTransfer: Story = {
  args: {method: InitiationMethod.MANUAL_BRANCH_TRANSFER}
};

/** All variants side by side */
export const AllVariants: Story = {
  args: {method: InitiationMethod.RTP},
  render: () => (
    <div className="flex flex-col gap-4">
      <PaymentInitiationMethodBadge method={InitiationMethod.RTP} />
      <PaymentInitiationMethodBadge method={InitiationMethod.MANUAL_BRANCH_TRANSFER} />
    </div>
  )
};

/** Hebrew RTL layout */
export const RTL: Story = {
  args: {method: InitiationMethod.RTP},
  decorators: [withHebrew],
  render: () => (
    <div className="flex flex-col gap-4">
      <PaymentInitiationMethodBadge method={InitiationMethod.RTP} />
      <PaymentInitiationMethodBadge method={InitiationMethod.MANUAL_BRANCH_TRANSFER} />
    </div>
  )
};
