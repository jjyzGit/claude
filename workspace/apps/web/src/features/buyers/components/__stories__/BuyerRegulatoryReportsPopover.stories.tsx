import {Button, Popover, PopoverTrigger} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import {mockTableRow, MOCK_TRUST_ACCOUNT_ID} from '../../__fixtures__/buyers.fixtures';
import {BuyerRegulatoryReportsPopover} from '../BuyerRegulatoryReportsPopover';

import type {BuyerRegulatoryReportsPopoverProps} from '../BuyerRegulatoryReportsPopover';
import type {Meta, StoryObj} from '@storybook/react-vite';

const basePurchase = mockTableRow.purchase;

const meta: Meta<BuyerRegulatoryReportsPopoverProps> = {
  title: 'Features/Buyers/Components/BuyerRegulatoryReportsPopover',
  component: BuyerRegulatoryReportsPopover,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    purchaseId: basePurchase.id,
    trustAccountId: MOCK_TRUST_ACCOUNT_ID,
    regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false}
  },
  render: args => (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="secondary">פתח</Button>} />
      <BuyerRegulatoryReportsPopover {...args} />
    </Popover>
  )
};

export default meta;
type Story = StoryObj<BuyerRegulatoryReportsPopoverProps>;

/** Both reports unchecked */
export const Unchecked: Story = {};

/** One report checked */
export const PartiallyChecked: Story = {
  args: {
    regulatoryReports: {realEstateTaxation: true, salesLawCommissioner: false}
  }
};

/** Both reports checked */
export const FullyChecked: Story = {
  args: {
    regulatoryReports: {realEstateTaxation: true, salesLawCommissioner: true}
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
