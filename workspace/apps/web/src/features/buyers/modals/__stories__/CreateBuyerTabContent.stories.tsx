import {useForm} from 'react-hook-form';

import {EMPTY_CREATE_BUYER_FORM_VALUES} from '@/features/buyers/validation';
import {withHebrew} from '@/stories/i18n-decorators';

import {CreateBuyerTabContent} from '../BuyersModal/create-buyer/CreateBuyerTabContent';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {Meta, StoryObj} from '@storybook/react-vite';

// CreateBuyerTabContent requires react-hook-form context — use render only stories
const meta = {
  title: 'Features/Buyers/Modals/CreateBuyerTabContent',
  component: CreateBuyerTabContent,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    trustAccountId: 'trust-account-1',
    form: undefined as never,
    onDocumentsChange: () => {},
    aiFields: new Map<string, AiSuggestion>(),
    isProcessing: false,
    suggestionsCount: 0,
    markFieldModified: () => {}
  }
} satisfies Meta<typeof CreateBuyerTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

function CreateBuyerForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: EMPTY_CREATE_BUYER_FORM_VALUES,
    mode: 'onBlur'
  });
  return (
    <div className="w-[660px]">
      <CreateBuyerTabContent
        trustAccountId="trust-account-1"
        form={form}
        onDocumentsChange={() => {}}
        aiFields={new Map<string, AiSuggestion>()}
        isProcessing={false}
        suggestionsCount={0}
        markFieldModified={() => {}}
      />
    </div>
  );
}

/** Empty form — initial state */
export const Default: Story = {
  render: () => <CreateBuyerForm />
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: () => <CreateBuyerForm />
};
