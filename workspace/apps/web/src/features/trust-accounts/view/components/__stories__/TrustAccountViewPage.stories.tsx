import {TrustAccountViewPage} from '@/pages';
import {withHebrew} from '@/stories/i18n-decorators';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountViewPage',
  component: TrustAccountViewPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    id: 'story-trust-account-id',
    name: 'Riverside Towers Phase 1',
    refId: 'TR-9100',
    description: '7% Account',
    buyersCount: 0,
    documentsCount: 0,
    hasTransactions: false,
    initialTab: 'overview',
    beneficiaries: []
  }
} satisfies Meta<typeof TrustAccountViewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew]
};
