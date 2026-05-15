import {withHebrew} from '@/stories/i18n-decorators';

import {BeneficiariesTabContentSkeleton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/Tabs/BeneficiariesTabContentSkeleton',
  component: BeneficiariesTabContentSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof BeneficiariesTabContentSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
