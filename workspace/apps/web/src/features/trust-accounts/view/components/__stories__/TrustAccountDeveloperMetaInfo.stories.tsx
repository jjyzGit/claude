import {DeveloperType, RelationshipType} from '@sollapay/enums';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountDeveloperMetaInfo} from '../TrustAccountDeveloperMetaInfo';

import type {TrustDeveloperDetailsDTO} from '@sollapay/types';
import type {Meta, StoryObj} from '@storybook/react-vite';

const corporateDeveloper: TrustDeveloperDetailsDTO = {
  developerType: DeveloperType.CORPORATION,
  relationshipType: RelationshipType.FEW_PROJECTS,
  metFaceToFace: true,
  fullName: 'Acme Development Ltd.',
  idNumber: '435345345',
  establishedDate: null,
  address: '45 Herzl St, Tel Aviv'
};

const individualDeveloper: TrustDeveloperDetailsDTO = {
  developerType: DeveloperType.INDIVIDUAL,
  relationshipType: RelationshipType.FIRST_PROJECT,
  metFaceToFace: false,
  fullName: 'John Smith',
  idNumber: '123456789',
  establishedDate: null,
  address: '12 Dizengoff St, Tel Aviv'
};

const meta = {
  title: 'Features/TrustAccounts/View/TrustAccountDeveloperMetaInfo',
  component: TrustAccountDeveloperMetaInfo,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  args: {
    developerDetails: corporateDeveloper,
    purpose: '7% Account'
  }
} satisfies Meta<typeof TrustAccountDeveloperMetaInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Individual: Story = {
  args: {
    developerDetails: individualDeveloper,
    purpose: 'Options Account'
  }
};

export const NoPurpose: Story = {
  args: {
    purpose: null
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    developerDetails: {
      ...corporateDeveloper,
      fullName: 'אמרלד גלובל בע"מ',
      address: 'הרצל 45, תל אביב'
    },
    purpose: 'חשבון 7%'
  }
};
