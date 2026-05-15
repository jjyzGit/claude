import {withHebrew} from '@/stories/i18n-decorators';

import {KpiCard} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Activity/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    icon: 'wallet',
    label: 'סה"כ יתרה',
    value: '₪1,250,000',
    change: '+8%',
    changeLabel: 'שינוי מהשבוע שעבר'
  }
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Negative: Story = {
  args: {
    change: '-5%'
  }
};

export const Zero: Story = {
  args: {
    change: '0%'
  }
};

export const NoChange: Story = {
  args: {
    change: null
  }
};

export const WithFundsCount: Story = {
  args: {
    icon: 'users',
    label: 'קונים פעילים',
    value: '24',
    change: '18',
    changeLabel: 'עם כספים בנאמנות',
    isPositive: true
  }
};

export const RTL: Story = {
  decorators: [withHebrew]
};
