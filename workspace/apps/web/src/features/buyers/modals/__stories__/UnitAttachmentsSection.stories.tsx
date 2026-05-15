import {UnitAttachmentType} from '@sollapay/enums';
import {useForm} from 'react-hook-form';

import {EMPTY_CREATE_BUYER_FORM_VALUES} from '@/features/buyers/validation';
import {withHebrew} from '@/stories/i18n-decorators';

import {UnitAttachmentsSection} from '../BuyersModal/create-buyer/UnitAttachmentsSection';

import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Buyers/Modals/UnitAttachmentsSection',
  component: UnitAttachmentsSection,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {form: undefined as never, aiFields: new Map()}
} satisfies Meta<typeof UnitAttachmentsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

function EmptyForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: EMPTY_CREATE_BUYER_FORM_VALUES,
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <UnitAttachmentsSection form={form} aiFields={new Map()} />
    </div>
  );
}

function FilledForm() {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: {
      ...EMPTY_CREATE_BUYER_FORM_VALUES,
      unit: {
        buildingNumber: '5',
        unitNumber: '12',
        attachments: [
          {type: UnitAttachmentType.Parking, description: 'P-12'},
          {type: UnitAttachmentType.Storage, description: 'S-3'}
        ]
      }
    },
    mode: 'onBlur'
  });
  return (
    <div className="w-[620px]">
      <UnitAttachmentsSection form={form} aiFields={new Map()} />
    </div>
  );
}

/** Empty — no attachments */
export const Default: Story = {render: () => <EmptyForm />};

/** Pre-filled with parking and storage */
export const Filled: Story = {render: () => <FilledForm />};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: () => <EmptyForm />
};
