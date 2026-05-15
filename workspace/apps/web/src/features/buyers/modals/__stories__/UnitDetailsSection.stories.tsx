import {useForm} from 'react-hook-form';

import {EMPTY_CREATE_BUYER_FORM_VALUES} from '@/features/buyers/validation';
import {withHebrew} from '@/stories/i18n-decorators';

import {UnitDetailsSection} from '../BuyersModal/create-buyer/UnitDetailsSection';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {Meta, StoryObj} from '@storybook/react-vite';

// UnitDetailsSection requires react-hook-form context — use render-only stories
const meta = {
  title: 'Features/Buyers/Modals/UnitDetailsSection',
  component: UnitDetailsSection,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    form: undefined as never,
    aiFields: new Map<string, AiSuggestion>(),
    markFieldModified: () => {}
  }
} satisfies Meta<typeof UnitDetailsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

function EmptyForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: EMPTY_CREATE_BUYER_FORM_VALUES,
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <UnitDetailsSection
        form={form}
        aiFields={new Map<string, AiSuggestion>()}
        markFieldModified={() => {}}
      />
    </div>
  );
}

function FilledForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: {
      ...EMPTY_CREATE_BUYER_FORM_VALUES,
      unit: {buildingNumber: '5', unitNumber: '12', attachments: []},
      purchasePriceNis: '1000000'
    },
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <UnitDetailsSection
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

/** Pre-filled with unit data */
export const Filled: Story = {
  render: () => <FilledForm />
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: () => <EmptyForm />
};
