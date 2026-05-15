import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {DocumentsTable} from '..';

import type {DocumentTableRow} from '..';
import type {Meta, StoryObj} from '@storybook/react-vite';

const mockDocuments: DocumentTableRow[] = [
  {
    id: '1',
    fileName: 'land-ownership-verification.pdf',
    fileExtension: 'pdf',
    fileSize: '4.2 MB',
    documentType: DocumentType.LAND_OWNERSHIP_VERIFICATION,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'Ravit Schwartz', role: 'Lawyer'}
  },
  {
    id: '2',
    fileName: 'transaction-legal-docs.pdf',
    fileExtension: 'pdf',
    fileSize: '400 KB',
    documentType: DocumentType.TRANSACTION_LEGAL_DOCUMENT,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'Miriam Schechter', role: 'Lawyer'}
  },
  {
    id: '3',
    fileName: 'developer-id.jpg',
    fileExtension: 'jpg',
    fileSize: '800 KB',
    documentType: DocumentType.ADDITIONAL_DOCUMENT,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'Danny Varkoni', role: 'Lawyer'}
  }
];

const hebrewDocuments: DocumentTableRow[] = [
  {
    id: '1',
    fileName: 'אימות בעלות קרקע.pdf',
    fileExtension: 'pdf',
    fileSize: '4.2 MB',
    documentType: DocumentType.LAND_OWNERSHIP_VERIFICATION,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'רווית שוורץ', role: 'עורך דין'}
  },
  {
    id: '2',
    fileName: 'מסמכים משפטיים לעסקה.pdf',
    fileExtension: 'pdf',
    fileSize: '400 KB',
    documentType: DocumentType.TRANSACTION_LEGAL_DOCUMENT,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'מרים שכטר', role: 'עורך דין'}
  },
  {
    id: '3',
    fileName: 'תעודת זהות יזם.jpg',
    fileExtension: 'jpg',
    fileSize: '800 KB',
    documentType: DocumentType.ADDITIONAL_DOCUMENT,
    uploadDate: '2025-01-06',
    lastUpdated: '2025-01-06',
    uploadedBy: {name: 'דני ורקוני', role: 'עורך דין'}
  }
];

const meta = {
  title: 'Features/Documents/DocumentsTable',
  component: DocumentsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    documents: mockDocuments,
    entityType: DocumentEntityType.TRUST_ACCOUNT,
    entityId: 'trust-account-1',
    documentContext: DocumentContext.TRUST_DETAILS
  }
} satisfies Meta<typeof DocumentsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    documents: []
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    documents: hebrewDocuments
  }
};
