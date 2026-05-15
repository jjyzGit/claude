import {TrustPurpose} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountFilterPurposeSection} from '../TrustAccountFilterPurposeSection';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountFilterPurposeSection',
  component: TrustAccountFilterPurposeSection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    purposes: [],
    onChange: () => {}
  }
} satisfies Meta<typeof TrustAccountFilterPurposeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No purposes selected */
export const Default: Story = {};

/** With pre-selected purpose */
export const WithSelection: Story = {
  args: {
    purposes: [TrustPurpose.SEVEN_PERCENT]
  }
};

/** All purposes selected */
export const AllSelected: Story = {
  args: {
    purposes: [TrustPurpose.SEVEN_PERCENT, TrustPurpose.OPTIONS]
  }
};

/** Interactive — purposes change on click */
export const Interactive: Story = {
  render: args => {
    const [purposes, setPurposes] = useState<TrustPurpose[]>([]);
    return (
      <TrustAccountFilterPurposeSection {...args} purposes={purposes} onChange={setPurposes} />
    );
  }
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    purposes: [TrustPurpose.OPTIONS]
  }
};
