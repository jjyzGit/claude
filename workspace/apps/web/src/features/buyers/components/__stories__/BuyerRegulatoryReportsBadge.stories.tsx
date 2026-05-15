import {withHebrew} from '@/stories/i18n-decorators';

import {mockTableRow, MOCK_TRUST_ACCOUNT_ID} from '../../__fixtures__/buyers.fixtures';
import {BuyerRegulatoryReportsBadge} from '../BuyerRegulatoryReportsBadge';

import type {Meta, StoryObj} from '@storybook/react-vite';

const basePurchase = mockTableRow.purchase;

const meta = {
  title: 'Features/Buyers/Components/BuyerRegulatoryReportsBadge',
  component: BuyerRegulatoryReportsBadge,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    purchase: basePurchase,
    trustAccountId: MOCK_TRUST_ACCOUNT_ID
  }
} satisfies Meta<typeof BuyerRegulatoryReportsBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 0/2 — gray badge, no reports filed */
export const Default: Story = {
  args: {
    purchase: {
      ...basePurchase,
      regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false}
    }
  }
};

/** 1/2 — gray badge, one report filed */
export const Partial: Story = {
  args: {
    purchase: {
      ...basePurchase,
      regulatoryReports: {realEstateTaxation: true, salesLawCommissioner: false}
    }
  }
};

/** 2/2 — success badge, both reports filed */
export const Complete: Story = {
  args: {
    purchase: {
      ...basePurchase,
      regulatoryReports: {realEstateTaxation: true, salesLawCommissioner: true}
    }
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
