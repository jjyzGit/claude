import {withHebrew} from '@/stories/i18n-decorators';

import {ConfirmActionModal} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/ConfirmActionModal',
  component: ConfirmActionModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    isOpen: true,
    title: 'Delete Trust Account',
    description: 'This action cannot be undone. The trust account will be permanently removed.',
    onConfirm: () => {},
    onClose: () => {}
  }
} satisfies Meta<typeof ConfirmActionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BrandVariant: Story = {
  args: {
    title: 'Submit for Review',
    description: 'Are you sure you want to submit this trust account for review?',
    icon: 'check-circle',
    iconVariant: 'brand',
    primaryVariant: 'primary',
    confirmLabel: 'Submit'
  }
};

export const WithLoading: Story = {
  args: {
    isLoading: true
  }
};

export const WithChildren: Story = {
  args: {
    title: 'Confirm Action',
    description: 'Please review the details below before confirming.',
    children: (
      <div className="rounded-md bg-background-subtle p-3 text-sm">
        <p>
          <strong>Account:</strong> Riverside Towers Phase 1
        </p>
        <p>
          <strong>Reference:</strong> TR-9100
        </p>
      </div>
    )
  }
};
