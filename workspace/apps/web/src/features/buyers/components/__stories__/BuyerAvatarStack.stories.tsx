import {withHebrew} from '@/stories/i18n-decorators';

import {mockBuyerDTO} from '../../__fixtures__/buyers.fixtures';
import {BuyerAvatarStack} from '../BuyerAvatarStack';

import type {Meta, StoryObj} from '@storybook/react-vite';

const buyer1 = mockBuyerDTO;
const buyer2 = {...mockBuyerDTO, id: 'buyer-2', fullName: 'יוסף לוי'};
const buyer3 = {...mockBuyerDTO, id: 'buyer-3', fullName: 'מיכל דוד'};
const buyer4 = {...mockBuyerDTO, id: 'buyer-4', fullName: 'אברהם פרידמן'};

const meta = {
  title: 'Features/Buyers/Components/BuyerAvatarStack',
  component: BuyerAvatarStack,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    buyers: [buyer1, buyer2],
    unitLabel: 'פנטהאוז 121',
    onViewBuyer: () => {}
  }
} satisfies Meta<typeof BuyerAvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single buyer — renders a plain avatar with no popover */
export const SingleBuyer: Story = {
  args: {buyers: [buyer1]}
};

/** Two buyers — clickable stack opens the popover */
export const TwoBuyers: Story = {};

/** Three buyers — at the MAX_VISIBLE limit */
export const ThreeBuyers: Story = {
  args: {buyers: [buyer1, buyer2, buyer3]}
};

/** Four buyers — overflow count (+1) shown */
export const OverflowBuyers: Story = {
  args: {buyers: [buyer1, buyer2, buyer3, buyer4]}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
