import {DocumentContext, DocumentEntityType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {DocumentActionsBar} from '../DocumentActionsBar';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Documents/DocumentActionsBar',
  component: DocumentActionsBar,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  args: {
    documentId: 'doc-1',
    entityType: DocumentEntityType.TRUST_ACCOUNT,
    entityId: 'trust-account-1',
    documentContext: DocumentContext.PURCHASE_DOCUMENTS
  }
} satisfies Meta<typeof DocumentActionsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Preview and download only */
export const Default: Story = {};

/** With delete action — pass onDeleted to enable delete button */
export const WithDelete: Story = {
  args: {onDeleted: () => {}}
};

/** RTL */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {onDeleted: () => {}}
};
