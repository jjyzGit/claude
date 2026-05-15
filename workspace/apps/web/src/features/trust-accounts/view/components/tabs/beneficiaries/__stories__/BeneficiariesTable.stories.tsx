import {withHebrew} from '@/stories/i18n-decorators';

import {BeneficiariesTable} from '..';

import type {BeneficiaryRow} from '..';
import type {Meta, StoryObj} from '@storybook/react-vite';

const mockBeneficiariesEn: BeneficiaryRow[] = [
  {
    name: 'Construction Co. Ltd',
    role: 'developer',
    idNumber: '05454675675',
    date: '',
    address: '1 Hankin St, Rehovot',
    isRoleDisabled: true
  },
  {
    name: '',
    role: 'buyer',
    idNumber: '',
    date: '2025-01-06',
    address: ''
  }
];

const mockBeneficiariesHe: BeneficiaryRow[] = [
  {
    name: 'חברת בניה בע״מ',
    role: 'developer',
    idNumber: '05454675675',
    date: '',
    address: 'חנקין 1, רחובות',
    isRoleDisabled: true
  },
  {
    name: '',
    role: 'buyer',
    idNumber: '',
    date: '2025-01-06',
    address: ''
  }
];

const meta = {
  title: 'Features/TrustAccounts/View/BeneficiariesTable',
  component: BeneficiariesTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    beneficiaries: mockBeneficiariesEn,
    onAddParty: () => {},
    onEditRow: () => {},
    onDeleteRow: () => {}
  }
} satisfies Meta<typeof BeneficiariesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    beneficiaries: mockBeneficiariesHe
  }
};

export const Empty: Story = {
  args: {
    beneficiaries: []
  }
};
