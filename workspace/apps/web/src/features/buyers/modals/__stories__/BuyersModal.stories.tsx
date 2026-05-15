import {ErrorCode} from '@sollapay/enums';
import {HttpClientError} from '@sollapay/http-client';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {BuyersModal} from '../BuyersModal';
import {PaymentRequestTabContent} from '../BuyersModal/payment-request/PaymentRequestTabContent';

import type {InitiationMethod} from '@sollapay/enums';
import type {Meta, StoryObj} from '@storybook/react-vite';

const STUB_BUYER = [{id: 'buyer-1', fullName: 'ישראל ישראלי'}];

const meta = {
  title: 'Features/Buyers/BuyersModal',
  component: BuyersModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    isOpen: true,
    onOpenChange: () => {},
    activeTab: 'create-buyer',
    isBuyerCreated: false,
    nextLabel: 'Add Buyer',
    backLabel: 'Back',
    nextDisabled: false,
    onNextClick: () => {},
    onBackClick: () => {},
    children: null
  }
} satisfies Meta<typeof BuyersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Create Buyer tab — form fields placeholder */
export const CreateBuyerTab: Story = {
  args: {
    activeTab: 'create-buyer',
    isBuyerCreated: false
  },
  render: args => (
    <div className="w-[660px]">
      <BuyersModal {...args}>
        <div className="flex flex-col gap-6 py-6 px-2 text-fg-tertiary text-sm text-center">
          Document upload + buyer details form renders here
        </div>
      </BuyersModal>
    </div>
  )
};

/** Payment Request tab — buyer already created, green badge on first tab */
export const PaymentRequestTab: Story = {
  args: {
    activeTab: 'payment-request',
    isBuyerCreated: true,
    nextLabel: 'Send Payment Request',
    nextDisabled: true
  },
  render: args => {
    const [paymentMethod, setPaymentMethod] = useState('');
    return (
      <div className="w-[660px]">
        <BuyersModal {...args} nextDisabled={!paymentMethod}>
          <PaymentRequestTabContent
            amountNis="105000"
            unitLabel="דירה 12, קומה 3"
            buyers={STUB_BUYER}
            selectedBuyerId="buyer-1"
            onBuyerChange={() => {}}
            initiationMethod={paymentMethod as InitiationMethod | ''}
            onInitiationMethodChange={val => setPaymentMethod(val)}
          />
        </BuyersModal>
      </div>
    );
  }
};

/** RTL — Create Buyer tab in Hebrew */
export const RTLCreateBuyer: Story = {
  decorators: [withHebrew],
  args: {
    activeTab: 'create-buyer',
    isBuyerCreated: false,
    nextLabel: 'הוסף קונה',
    backLabel: 'חזור'
  },
  render: args => (
    <div className="w-[660px]">
      <BuyersModal {...args}>
        <div className="flex flex-col gap-6 py-6 px-2 text-fg-tertiary text-sm text-center">
          Document upload + buyer details form renders here
        </div>
      </BuyersModal>
    </div>
  )
};

/** Payment Request tab — mutation error displayed in form */
export const PaymentRequestWithError: Story = {
  args: {
    activeTab: 'payment-request',
    isBuyerCreated: true,
    nextLabel: 'Send Payment Request'
  },
  render: args => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const error = new HttpClientError(
      'Trust account is not open for payments',
      403,
      ErrorCode.PAYMENT_FORBIDDEN
    );
    return (
      <div className="w-[660px]">
        <BuyersModal {...args} nextDisabled={!paymentMethod}>
          <PaymentRequestTabContent
            amountNis="105000"
            unitLabel="דירה 12, קומה 3"
            buyers={STUB_BUYER}
            selectedBuyerId="buyer-1"
            onBuyerChange={() => {}}
            initiationMethod={paymentMethod as InitiationMethod | ''}
            onInitiationMethodChange={val => setPaymentMethod(val)}
            saveError={error}
          />
        </BuyersModal>
      </div>
    );
  }
};

/** RTL — Payment Request tab in Hebrew */
export const RTLPaymentRequest: Story = {
  decorators: [withHebrew],
  args: {
    activeTab: 'payment-request',
    isBuyerCreated: true,
    nextLabel: 'שלח בקשת תשלום לקונה',
    backLabel: 'חזור',
    nextDisabled: true
  },
  render: args => {
    const [paymentMethod, setPaymentMethod] = useState('');
    return (
      <div className="w-[660px]">
        <BuyersModal {...args} nextDisabled={!paymentMethod}>
          <PaymentRequestTabContent
            amountNis="105000"
            unitLabel="דירה 12, קומה 3"
            buyers={STUB_BUYER}
            selectedBuyerId="buyer-1"
            onBuyerChange={() => {}}
            initiationMethod={paymentMethod as InitiationMethod | ''}
            onInitiationMethodChange={val => setPaymentMethod(val)}
          />
        </BuyersModal>
      </div>
    );
  }
};

/** RTL — Payment Request tab in Hebrew with error */
export const RTLPaymentRequestWithError: Story = {
  decorators: [withHebrew],
  args: {
    activeTab: 'payment-request',
    isBuyerCreated: true,
    nextLabel: 'שלח בקשת תשלום לקונה',
    backLabel: 'חזור'
  },
  render: args => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const error = new HttpClientError(
      'Trust account is not open for payments',
      403,
      ErrorCode.PAYMENT_FORBIDDEN
    );
    return (
      <div className="w-[660px]">
        <BuyersModal {...args} nextDisabled={!paymentMethod}>
          <PaymentRequestTabContent
            amountNis="105000"
            unitLabel="דירה 12, קומה 3"
            buyers={STUB_BUYER}
            selectedBuyerId="buyer-1"
            onBuyerChange={() => {}}
            initiationMethod={paymentMethod as InitiationMethod | ''}
            onInitiationMethodChange={val => setPaymentMethod(val)}
            saveError={error}
          />
        </BuyersModal>
      </div>
    );
  }
};
