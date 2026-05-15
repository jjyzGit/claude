import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerGroupBadge} from '..';
import {mockBuyerDTO} from '../../__fixtures__/buyers.fixtures';

import type {Meta, StoryObj} from '@storybook/react-vite';

const secondBuyer = {...mockBuyerDTO, id: 'buyer-2', fullName: 'יוסף לוי'};
const thirdBuyer = {...mockBuyerDTO, id: 'buyer-3', fullName: 'מיכל דוד'};

const meta = {
  title: 'Features/Buyers/Components/BuyerGroupBadge',
  component: BuyerGroupBadge,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    buyers: [secondBuyer],
    onViewBuyer: () => {}
  }
} satisfies Meta<typeof BuyerGroupBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One additional buyer — hover to see the popover */
export const Default: Story = {};

/** Two additional buyers */
export const TwoExtra: Story = {
  args: {buyers: [secondBuyer, thirdBuyer]}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
