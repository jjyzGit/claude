import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerSuccessPromptModal} from '../BuyerSuccessPromptModal';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/BuyerSuccessPromptModal',
  component: BuyerSuccessPromptModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    isOpen: true,
    buyerName: 'Israel Israeli',
    onContinueToPayment: () => {},
    onBackToBuyers: () => {}
  }
} satisfies Meta<typeof BuyerSuccessPromptModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    buyerName: 'ישראל ישראלי'
  }
};
