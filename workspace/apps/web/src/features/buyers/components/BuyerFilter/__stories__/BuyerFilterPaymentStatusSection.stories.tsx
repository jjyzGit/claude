import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerFilterPaymentStatusSection} from '../BuyerFilterPaymentStatusSection';

import type {BuyerPaymentStatus} from '../../../types/buyers.types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerFilterPaymentStatusSection',
  component: BuyerFilterPaymentStatusSection,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    selected: [],
    onChange: () => {}
  }
} satisfies Meta<typeof BuyerFilterPaymentStatusSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing selected */
export const Default: Story = {
  render: args => (
    <div className="w-[280px]">
      <BuyerFilterPaymentStatusSection {...args} />
    </div>
  )
};

/** Two statuses pre-selected */
export const WithSelected: Story = {
  args: {selected: ['no_request', 'completed'] satisfies BuyerPaymentStatus[]},
  render: args => (
    <div className="w-[280px]">
      <BuyerFilterPaymentStatusSection {...args} />
    </div>
  )
};

/** All statuses selected */
export const AllSelected: Story = {
  args: {
    selected: [
      'no_request',
      'request_sent',
      'partial',
      'completed',
      'cancelled',
      'expired'
    ] satisfies BuyerPaymentStatus[]
  },
  render: args => (
    <div className="w-[280px]">
      <BuyerFilterPaymentStatusSection {...args} />
    </div>
  )
};

/** Interactive — selection wired up */
export const Interactive: Story = {
  render: args => {
    const [selected, setSelected] = useState<BuyerPaymentStatus[]>([]);
    return (
      <div className="w-[280px]">
        <BuyerFilterPaymentStatusSection {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => (
    <div className="w-[280px]">
      <BuyerFilterPaymentStatusSection {...args} />
    </div>
  )
};
