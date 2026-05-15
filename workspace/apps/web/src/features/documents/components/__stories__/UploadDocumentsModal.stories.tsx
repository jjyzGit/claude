import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {Button} from '@sollapay/ui/components';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {UploadDocumentsModal} from '../UploadDocumentsModal';

import type {Meta, StoryObj} from '@storybook/react-vite';

const sharedArgs = {
  title: 'Add Documents',
  subtitle: 'Upload documents to this trust account',
  entityType: DocumentEntityType.TRUST_ACCOUNT,
  entityId: 'trust-account-1',
  documentContext: DocumentContext.TRUST_DETAILS,
  tabs: [
    {
      value: 'companyRegistrationExtract',
      label: 'Company Registration Extract',
      documentType: DocumentType.COMPANY_REGISTRATION_EXTRACT,
      maxFiles: 1
    },
    {
      value: 'incorporationCertificate',
      label: 'Certificate of Incorporation',
      documentType: DocumentType.INCORPORATION_CERTIFICATE,
      required: true,
      maxFiles: 1
    }
  ],
  defaultValue: 'companyRegistrationExtract'
};

const meta = {
  title: 'Features/Documents/UploadDocumentsModal',
  component: UploadDocumentsModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    ...sharedArgs,
    isOpen: false,
    onClose: () => {}
  }
} satisfies Meta<typeof UploadDocumentsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controlled open state */
export const Open: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <UploadDocumentsModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>פתח</Button>
        <UploadDocumentsModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }
};
