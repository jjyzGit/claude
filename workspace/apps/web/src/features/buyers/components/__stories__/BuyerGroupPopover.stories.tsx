import {Button, Popover, PopoverTrigger} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import {mockBuyerDTO} from '../../__fixtures__/buyers.fixtures';
import {BuyerGroupPopoverContent} from '../BuyerGroupPopover';

import type {BuyerGroupPopoverContentProps} from '../BuyerGroupPopover';
import type {Meta, StoryObj} from '@storybook/react-vite';

const buyer1 = mockBuyerDTO;
const buyer2 = {...mockBuyerDTO, id: 'buyer-2', fullName: 'יוסף לוי'};
const buyer3 = {...mockBuyerDTO, id: 'buyer-3', fullName: 'מיכל דוד'};

const meta: Meta<BuyerGroupPopoverContentProps> = {
  title: 'Features/Buyers/Components/BuyerGroupPopover',
  component: BuyerGroupPopoverContent,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    buyers: [buyer1, buyer2],
    unitLabel: 'פנטהאוז 121',
    mode: 'all',
    onViewBuyer: () => {}
  },
  render: args => (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="secondary">פתח</Button>} />
      <BuyerGroupPopoverContent {...args} />
    </Popover>
  )
};

export default meta;
type Story = StoryObj<BuyerGroupPopoverContentProps>;

/** All mode — shows unit label and "N קונים" */
export const AllMode: Story = {};

/** Extra mode — no unit label, shows "N קונים נוספים" */
export const ExtraMode: Story = {
  args: {mode: 'extra', unitLabel: undefined}
};

/** Three buyers */
export const ThreeBuyers: Story = {
  args: {buyers: [buyer1, buyer2, buyer3]}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
