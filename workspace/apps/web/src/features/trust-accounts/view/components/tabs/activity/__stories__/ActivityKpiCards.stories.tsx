import {withHebrew} from '@/stories/i18n-decorators';

import {ActivityKpiCards} from '..';

import type {TrustAccountStatsDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const mockStats: TrustAccountStatsDTO = {
  totalBalance: {
    amountNis: '1250000',
    change: {percentageChange: 8.2, direction: 'increase', displayValue: '+8.2%'}
  },
  depositsThisWeek: {
    amountNis: '85000',
    change: {percentageChange: 12.5, direction: 'increase', displayValue: '+12.5%'}
  },
  activeBuyers: {count: 24, withFundsCount: 18},
  transactions: {
    count: 156,
    change: {percentageChange: -3.1, direction: 'decrease', displayValue: '-3.1%'}
  }
};

const meta = {
  title: 'Features/TrustAccounts/View/Activity/ActivityKpiCards',
  component: ActivityKpiCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    stats: mockStats
  }
} satisfies Meta<typeof ActivityKpiCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};

export const NegativeChanges: Story = {
  args: {
    stats: {
      totalBalance: {
        amountNis: '950000',
        change: {percentageChange: -5.4, direction: 'decrease', displayValue: '-5.4%'}
      },
      depositsThisWeek: {
        amountNis: '32000',
        change: {percentageChange: -18.3, direction: 'decrease', displayValue: '-18.3%'}
      },
      activeBuyers: {count: 12, withFundsCount: 7},
      transactions: {
        count: 89,
        change: {percentageChange: -12.0, direction: 'decrease', displayValue: '-12.0%'}
      }
    }
  }
};

export const NoChanges: Story = {
  args: {
    stats: {
      totalBalance: {amountNis: '500000', change: null},
      depositsThisWeek: {
        amountNis: '0',
        change: {percentageChange: 0, direction: 'no_change', displayValue: '0%'}
      },
      activeBuyers: {count: 0, withFundsCount: 0},
      transactions: {
        count: 0,
        change: {percentageChange: 0, direction: 'no_change', displayValue: '0%'}
      }
    }
  }
};
