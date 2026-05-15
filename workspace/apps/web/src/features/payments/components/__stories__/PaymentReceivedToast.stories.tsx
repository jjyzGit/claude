import {Button, Toaster} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import {PaymentReceivedToast, showPaymentReceivedToast} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof PaymentReceivedToast> = {
  title: 'Features/Payments/PaymentReceivedToast',
  component: PaymentReceivedToast,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    toastId: 'story-toast',
    trustName: 'פרויקט הירוק',
    name: 'ישראל ישראלי',
    amount: '₪50,000',
    dateTime: '1 במאי 2026, 14:30',
    onNavigate: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Hebrew: Story = {
  decorators: [withHebrew]
};

export const English: Story = {
  args: {
    trustName: 'Green Project',
    name: 'John Smith',
    amount: '$50,000',
    dateTime: 'May 1, 2026, 2:30 PM'
  }
};

export const Animated: Story = {
  decorators: [withHebrew],
  render: () => (
    <>
      <Toaster position="bottom-center" />
      <Button
        variant="secondary"
        onClick={() =>
          showPaymentReceivedToast(
            'פרויקט הירוק',
            'ישראל ישראלי',
            '₪50,000',
            '1 במאי 2026, 14:30',
            () => {}
          )
        }
      >
        סמן תשלום כהתקבל
      </Button>
    </>
  )
};
