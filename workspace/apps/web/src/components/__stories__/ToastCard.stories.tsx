import {withHebrew} from '@/stories/i18n-decorators';

import {ToastCard} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/ToastCard',
  component: ToastCard,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    iconName: 'check-circle',
    variant: 'success',
    title: 'חשבון הנאמנות הופעל',
    description: 'לחץ כאן כדי לנווט לחשבון',
    onNavigate: () => {},
    onClose: () => {},
    closeLabel: 'סגור'
  }
} satisfies Meta<typeof ToastCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const English: Story = {
  args: {
    title: 'Trust account activated',
    description: 'Click here to navigate to the account',
    closeLabel: 'Close'
  }
};

export const LongTitle: Story = {
  decorators: [withHebrew],
  args: {
    title: 'חשבון נאמנות פרויקט הדיור המשותף בשכונת רמת אביב הצפונית הופעל בהצלחה'
  }
};

export const Warning: Story = {
  args: {
    iconName: 'alert-circle',
    variant: 'warning',
    title: 'Action required',
    description: 'Please review the pending items',
    closeLabel: 'Close'
  }
};
