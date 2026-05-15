import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerFilterDepositRangeSection} from '../BuyerFilterDepositRangeSection';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Components/BuyerFilterDepositRangeSection',
  component: BuyerFilterDepositRangeSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    depositRange: undefined,
    onChange: () => {}
  }
} satisfies Meta<typeof BuyerFilterDepositRangeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No range set — slider at full range */
export const Default: Story = {};

/** Pre-set range — 50,000 to 200,000 NIS */
export const WithRange: Story = {
  args: {
    depositRange: {min: 50_000, max: 200_000}
  }
};

/** Interactive slider */
export const Interactive: Story = {
  render: args => {
    const [range, setRange] = useState(args.depositRange);
    return (
      <div className="w-[280px]">
        <BuyerFilterDepositRangeSection {...args} depositRange={range} onChange={setRange} />
      </div>
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
