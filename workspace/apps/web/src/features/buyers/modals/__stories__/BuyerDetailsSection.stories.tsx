import React from 'react';
import {useForm} from 'react-hook-form';

import {EMPTY_CREATE_BUYER_FORM_VALUES} from '@/features/buyers/validation';
import {withHebrew} from '@/stories/i18n-decorators';

import {BuyerDetailsSection} from '../BuyersModal/create-buyer/BuyerDetailsSection';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {Meta, StoryObj} from '@storybook/react-vite';

// BuyerDetailsSection requires react-hook-form context — use render-only stories
const meta = {
  title: 'Features/Buyers/Modals/BuyerDetailsSection',
  component: BuyerDetailsSection,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    form: undefined as never,
    aiFields: new Map<string, AiSuggestion>(),
    markFieldModified: () => {}
  }
} satisfies Meta<typeof BuyerDetailsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

function EmptyForm({trailing}: {trailing?: React.ReactNode}) {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: EMPTY_CREATE_BUYER_FORM_VALUES,
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <BuyerDetailsSection
        form={form}
        aiFields={new Map<string, AiSuggestion>()}
        markFieldModified={() => {}}
        trailing={trailing}
      />
    </div>
  );
}

function FilledForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: {
      ...EMPTY_CREATE_BUYER_FORM_VALUES,
      buyers: [
        {
          fullName: 'שרה כהן',
          nationalId: '012345674',
          email: 'sarah@example.com',
          phone: '+972541234567',
          dateOfBirth: '1985-05-14',
          address: 'הרצל 45, תל אביב'
        }
      ]
    },
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <BuyerDetailsSection
        form={form}
        aiFields={new Map<string, AiSuggestion>()}
        markFieldModified={() => {}}
      />
    </div>
  );
}

/** Empty form — initial state */
export const Default: Story = {
  render: () => <EmptyForm />
};

/** Pre-filled with buyer data */
export const Filled: Story = {
  render: () => <FilledForm />
};

/** With a trailing status element aligned to the section heading */
export const WithTrailing: Story = {
  render: () => (
    <EmptyForm
      trailing={
        <span className="rounded-full bg-brand-primary px-2 py-0.5 text-xs text-white">Status</span>
      }
    />
  )
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: () => <EmptyForm />
};

/** RTL with trailing */
export const RTLWithTrailing: Story = {
  decorators: [withHebrew],
  render: () => (
    <EmptyForm
      trailing={
        <span className="rounded-full bg-brand-primary px-2 py-0.5 text-xs text-white">סטטוס</span>
      }
    />
  )
};
