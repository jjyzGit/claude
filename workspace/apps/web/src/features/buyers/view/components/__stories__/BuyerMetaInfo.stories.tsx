import {withHebrew} from '@/stories/i18n-decorators';

import {mockBuyer} from '../../../__fixtures__/buyers.fixtures';
import {BuyerMetaInfo} from '../BuyerMetaInfo';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/View/BuyerMetaInfo',
  component: BuyerMetaInfo,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {buyer: mockBuyer}
} satisfies Meta<typeof BuyerMetaInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All fields filled */
export const Default: Story = {};

/** Missing optional fields */
export const PartialData: Story = {
  args: {
    buyer: {...mockBuyer, dateOfBirth: null, phone: null}
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew]
};
