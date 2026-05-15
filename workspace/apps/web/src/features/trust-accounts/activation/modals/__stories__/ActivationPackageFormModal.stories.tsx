import {Button} from '@sollapay/ui/components';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {ActivationPackageFormModal} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Activation/ActivationPackageFormModal',
  component: ActivationPackageFormModal,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    trustAccountId: 'demo-id',
    isOpen: false,
    onClose: () => {}
  }
} satisfies Meta<typeof ActivationPackageFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Open Activation Package Form
      </Button>
      <ActivationPackageFormModal
        trustAccountId="demo-id"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disableFocusTrap
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultDemo />
};

function RTLDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        פתח טופס חבילת הפעלה
      </Button>
      <ActivationPackageFormModal
        trustAccountId="demo-id"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disableFocusTrap
      />
    </div>
  );
}

export const RTL: Story = {
  decorators: [withHebrew],
  render: () => <RTLDemo />
};
