import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerUnitTabs} from '../BuyerUnitTabs';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerUnitTabs',
  component: BuyerUnitTabs,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    units: ['Penthouse 121', '99 apt'],
    selectedIndex: 0,
    onSelect: () => {}
  }
} satisfies Meta<typeof BuyerUnitTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Two units — first selected */
export const Default: Story = {
  render: args => {
    const [selected, setSelected] = useState(args.selectedIndex);
    return <BuyerUnitTabs {...args} selectedIndex={selected} onSelect={setSelected} />;
  }
};

/** Three units — interactive selection */
export const ThreeUnits: Story = {
  args: {units: ['Penthouse 121', '99 apt', 'Garden Suite']},
  render: args => {
    const [selected, setSelected] = useState(0);
    return <BuyerUnitTabs {...args} selectedIndex={selected} onSelect={setSelected} />;
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => {
    const [selected, setSelected] = useState(0);
    return <BuyerUnitTabs {...args} selectedIndex={selected} onSelect={setSelected} />;
  }
};
