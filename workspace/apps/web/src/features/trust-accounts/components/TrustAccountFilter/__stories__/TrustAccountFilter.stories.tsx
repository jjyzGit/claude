import {TrustPurpose, TrustStatus} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {DEFAULT_FILTER_STATE} from '../../../config/filter.config';
import {TrustAccountFilter} from '../TrustAccountFilter';

import type {TrustAccountFilterState} from '../../../utils/filter.utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/TrustAccountFilter',
  component: TrustAccountFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    filter: DEFAULT_FILTER_STATE,
    onChange: () => {}
  }
} satisfies Meta<typeof TrustAccountFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [filter, setFilter] = useState<TrustAccountFilterState>(DEFAULT_FILTER_STATE);
    const [log, setLog] = useState<Array<{field: string; value: unknown}>>([]);

    const handleChange = (next: TrustAccountFilterState) => {
      const changed = (Object.keys(next) as (keyof TrustAccountFilterState)[]).filter(
        key => JSON.stringify(next[key]) !== JSON.stringify(filter[key])
      );
      setLog(prev => [...changed.map(field => ({field, value: next[field]})), ...prev]);
      setFilter(next);
    };

    return (
      <div className="flex gap-6 items-start">
        <TrustAccountFilter filter={filter} onChange={handleChange} />
        <div className="min-w-[260px] rounded-md border border-border p-3 font-mono text-xs">
          <div className="mb-2 font-semibold text-fg">onChange log</div>
          {log.length === 0 && <div className="text-fg-tertiary">No events yet</div>}
          {log.map((entry, i) => (
            <div key={i} className="mb-1 border-b border-border pb-1 last:border-0">
              <span className="text-accent-primary font-semibold">{entry.field}</span>
              {' → '}
              <span className="text-fg-secondary">{JSON.stringify(entry.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export const WithActiveFilters: Story = {
  args: {
    filter: {
      statuses: [TrustStatus.TRUST_ACTIVE, TrustStatus.IN_REVIEW],
      purposes: [TrustPurpose.SEVEN_PERCENT],
      createdAt: '30d'
    }
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Interactive: Story = {
  render: () => {
    const [filter, setFilter] = useState<TrustAccountFilterState>(DEFAULT_FILTER_STATE);
    return <TrustAccountFilter filter={filter} onChange={setFilter} />;
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => {
    const [filter, setFilter] = useState<TrustAccountFilterState>(DEFAULT_FILTER_STATE);
    return <TrustAccountFilter filter={filter} onChange={setFilter} />;
  }
};

export const RTLWithActiveFilters: Story = {
  decorators: [withHebrew],
  args: {
    filter: {
      statuses: [TrustStatus.TRUST_ACTIVE],
      purposes: [TrustPurpose.OPTIONS],
      createdAt: '7d'
    }
  }
};
