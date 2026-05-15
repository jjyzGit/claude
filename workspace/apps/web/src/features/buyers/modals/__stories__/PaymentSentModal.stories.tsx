import {InitiationMethod} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {PaymentSentModal} from '../PaymentSentModal';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/PaymentSentModal',
  component: PaymentSentModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    isOpen: true,
    buyerName: 'Israel Israeli',
    unitLabel: 'B1-U12',
    purchasePriceNis: '2500000',
    initiationMethod: InitiationMethod.RTP,
    amountNis: '175000',
    onClose: () => {}
  }
} satisfies Meta<typeof PaymentSentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RTP: Story = {};

export const ManualBranchTransfer: Story = {
  args: {
    initiationMethod: InitiationMethod.MANUAL_BRANCH_TRANSFER
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    buyerName: 'ישראל ישראלי',
    unitLabel: 'B1-U12'
  }
};
