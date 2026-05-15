import {MemoryRouter} from 'react-router-dom';

import {withHebrew} from '@/stories/i18n-decorators';

import {
  mockBuyer,
  mockBuyerMultiUnit,
  MOCK_TRUST_ACCOUNT_ID
} from '../../../__fixtures__/buyers.fixtures';
import {BuyerViewHeader} from '../BuyerViewHeader';

import type {Decorator, Meta, StoryObj} from '@storybook/react-vite';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Features/Buyers/View/BuyerViewHeader',
  component: BuyerViewHeader,
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  decorators: [withRouter],
  args: {
    buyer: mockBuyer,
    trustAccountId: MOCK_TRUST_ACCOUNT_ID,
    trustAccountName: 'פרויקט הירוק'
  }
} satisfies Meta<typeof BuyerViewHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — single unit buyer */
export const Default: Story = {};

/** Multi-unit buyer */
export const MultiUnit: Story = {
  args: {buyer: mockBuyerMultiUnit}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
