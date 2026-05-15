import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountViewTabs} from '..';

import type {TrustAccountViewTab} from '@/features/trust-accounts/view/utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountViewTabs',
  component: TrustAccountViewTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    buyersCount: 3,
    transactionsCount: 12,
    documentsCount: 4,
    beneficiariesCount: 2,
    value: 'overview',
    onValueChange: () => {}
  }
} satisfies Meta<typeof TrustAccountViewTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState<TrustAccountViewTab>(args.value);
    return <TrustAccountViewTabs {...args} value={value} onValueChange={setValue} />;
  }
};

export const EmptyCounts: Story = {
  args: {
    buyersCount: 0,
    transactionsCount: 0,
    documentsCount: 0,
    beneficiariesCount: 0
  },
  render: args => {
    const [value, setValue] = useState<TrustAccountViewTab>(args.value);
    return <TrustAccountViewTabs {...args} value={value} onValueChange={setValue} />;
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: args => {
    const [value, setValue] = useState<TrustAccountViewTab>(args.value);
    return <TrustAccountViewTabs {...args} value={value} onValueChange={setValue} />;
  }
};
