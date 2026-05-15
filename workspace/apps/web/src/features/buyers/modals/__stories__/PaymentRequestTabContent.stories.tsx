import {InitiationMethod} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {PaymentRequestTabContent} from '../BuyersModal/payment-request/PaymentRequestTabContent';

import type {Meta, StoryObj} from '@storybook/react-vite';

const SINGLE_BUYER = [{id: 'buyer-1', fullName: 'שרה כהן'}];
const TWO_BUYERS = [
  {id: 'buyer-1', fullName: 'שרה כהן'},
  {id: 'buyer-2', fullName: 'דוד כהן'}
];

const meta = {
  title: 'Features/Buyers/Modals/PaymentRequestTabContent',
  component: PaymentRequestTabContent,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    amountNis: '70000',
    maxAmountNis: '70000',
    remainingAmountNis: '70000',
    unitLabel: 'דירה 12, קומה 3',
    buyers: SINGLE_BUYER,
    selectedBuyerId: 'buyer-1',
    onBuyerChange: () => {},
    initiationMethod: '' as const,
    onInitiationMethodChange: () => {},
    onAmountChange: () => {}
  }
} satisfies Meta<typeof PaymentRequestTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — no method selected yet */
export const Default: Story = {
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** RTP method pre-selected */
export const RTPSelected: Story = {
  args: {initiationMethod: InitiationMethod.RTP},
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** Manual branch transfer pre-selected */
export const ManualBranchTransfer: Story = {
  args: {initiationMethod: InitiationMethod.MANUAL_BRANCH_TRANSFER},
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** Partial remaining — some payments already sent */
export const PartialRemaining: Story = {
  args: {
    amountNis: '40000',
    maxAmountNis: '70000',
    remainingAmountNis: '40000'
  },
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** Two buyers — select is interactive */
export const TwoBuyers: Story = {
  args: {buyers: TWO_BUYERS},
  render: args => {
    const [buyer, setBuyer] = useState(args.selectedBuyerId);
    return (
      <div className="w-[560px]">
        <PaymentRequestTabContent {...args} selectedBuyerId={buyer} onBuyerChange={setBuyer} />
      </div>
    );
  }
};

/** No unit context */
export const NoContext: Story = {
  args: {unitLabel: undefined},
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** Interactive — method selection wired up */
export const Interactive: Story = {
  render: args => {
    const [method, setMethod] = useState<InitiationMethod | ''>(args.initiationMethod);
    return (
      <div className="w-[560px]">
        <PaymentRequestTabContent
          {...args}
          initiationMethod={method}
          onInitiationMethodChange={setMethod}
        />
      </div>
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => (
    <div className="w-[560px]">
      <PaymentRequestTabContent {...args} />
    </div>
  )
};

/** Max button visible — amount empty. Requires VITE_ALLOW_CUSTOM_PAYMENT_AMOUNT=true. */
export const WithMaxButton: Story = {
  args: {amountNis: ''},
  render: args => {
    const [amount, setAmount] = useState(args.amountNis);
    return (
      <div className="w-[560px]">
        <PaymentRequestTabContent {...args} amountNis={amount} onAmountChange={setAmount} />
      </div>
    );
  }
};

/** Max button visible — RTL / Hebrew. Requires VITE_ALLOW_CUSTOM_PAYMENT_AMOUNT=true. */
export const WithMaxButtonRTL: Story = {
  decorators: [withHebrew],
  args: {amountNis: ''},
  render: args => {
    const [amount, setAmount] = useState(args.amountNis);
    return (
      <div className="w-[560px]">
        <PaymentRequestTabContent {...args} amountNis={amount} onAmountChange={setAmount} />
      </div>
    );
  }
};
