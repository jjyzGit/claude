import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {AddDocumentsButton} from '../AddDocumentsButton';

import type {Meta, StoryObj} from '@storybook/react-vite';

const sharedProps = {
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
      maxFiles: 1
    }
  ]
};

const meta = {
  title: 'Features/Documents/AddDocumentsButton',
  component: AddDocumentsButton,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: sharedProps
} satisfies Meta<typeof AddDocumentsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Button in default state — click to open the upload modal */
export const Default: Story = {};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    title: 'הוספת מסמכים',
    subtitle: 'העלה מסמכים לחשבון הנאמנות',
    tabs: [
      {
        value: 'companyRegistrationExtract',
        label: 'תמצית רישום חברה',
        documentType: DocumentType.COMPANY_REGISTRATION_EXTRACT,
        maxFiles: 1
      },
      {
        value: 'incorporationCertificate',
        label: 'תעודת התאגדות',
        documentType: DocumentType.INCORPORATION_CERTIFICATE,
        maxFiles: 1
      }
    ]
  }
};
