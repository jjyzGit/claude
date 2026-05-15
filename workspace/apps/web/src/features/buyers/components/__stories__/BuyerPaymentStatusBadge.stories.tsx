import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerPaymentStatusBadge} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerPaymentStatusBadge',
  component: BuyerPaymentStatusBadge,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    status: 'no_request'
  }
} satisfies Meta<typeof BuyerPaymentStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No payment request sent */
export const NoRequest: Story = {};

/** Payment request sent */
export const RequestSent: Story = {
  args: {status: 'request_sent'}
};

/** Partial payment received */
export const Partial: Story = {
  args: {status: 'partial'}
};

/** Payment completed */
export const Completed: Story = {
  args: {status: 'completed'}
};

/** Payment cancelled */
export const Cancelled: Story = {
  args: {status: 'cancelled'}
};

/** Payment request expired */
export const Expired: Story = {
  args: {status: 'expired'}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
