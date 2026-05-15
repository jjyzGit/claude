import {TrustStatus} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountFilterStatusSection} from '../TrustAccountFilterStatusSection';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountFilterStatusSection',
  component: TrustAccountFilterStatusSection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    statuses: [],
    onChange: () => {}
  }
} satisfies Meta<typeof TrustAccountFilterStatusSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No statuses selected */
export const Default: Story = {};

/** With pre-selected statuses */
export const WithSelection: Story = {
  args: {
    statuses: [TrustStatus.TRUST_ACTIVE, TrustStatus.IN_REVIEW]
  }
};

/** Interactive — statuses change on click */
export const Interactive: Story = {
  render: args => {
    const [statuses, setStatuses] = useState<TrustStatus[]>([]);
    return <TrustAccountFilterStatusSection {...args} statuses={statuses} onChange={setStatuses} />;
  }
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    statuses: [TrustStatus.TRUST_ACTIVE]
  }
};
