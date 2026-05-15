import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerActionButton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerActionButton',
  component: BuyerActionButton,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    paymentStatus: 'no_request',
    onRequestPayment: () => {},
    onViewBuyer: () => {}
  }
} satisfies Meta<typeof BuyerActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No payment request yet — shows "Request Payment" primary button */
export const NoRequest: Story = {};

/** Payment request sent — shows "View Buyer" secondary button */
export const RequestSent: Story = {
  args: {paymentStatus: 'request_sent'}
};

/** Payment completed — shows "View Buyer" secondary button */
export const Completed: Story = {
  args: {paymentStatus: 'completed'}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
