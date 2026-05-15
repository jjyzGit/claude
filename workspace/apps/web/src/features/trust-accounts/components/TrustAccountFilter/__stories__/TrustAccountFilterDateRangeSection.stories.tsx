import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountFilterDateRangeSection} from '../TrustAccountFilterDateRangeSection';

import type {TrustAccountDateRange} from '../../../utils/filter.utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountFilterDateRangeSection',
  component: TrustAccountFilterDateRangeSection,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    dateRange: undefined,
    onChange: () => {}
  }
} satisfies Meta<typeof TrustAccountFilterDateRangeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No date range selected — shows placeholder */
export const Default: Story = {};

/** Pre-selected date range */
export const WithDateRange: Story = {
  args: {
    dateRange: {
      from: new Date('2025-01-01'),
      to: new Date('2025-01-31')
    }
  }
};

/** Interactive — date range changes on calendar select */
export const Interactive: Story = {
  render: args => {
    const [dateRange, setDateRange] = useState<TrustAccountDateRange | undefined>(undefined);
    return (
      <TrustAccountFilterDateRangeSection {...args} dateRange={dateRange} onChange={setDateRange} />
    );
  }
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    dateRange: {
      from: new Date('2025-03-01'),
      to: new Date('2025-03-31')
    }
  }
};
