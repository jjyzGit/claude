import {TrustPurpose} from '@sollapay/enums';
import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountFormFields} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/TrustAccounts/Components/TrustAccountFormFields',
  component: TrustAccountFormFields,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    name: '',
    onNameChange: () => {},
    trustPurpose: '',
    onTrustPurposeChange: () => {},
    submitError: null
  }
} satisfies Meta<typeof TrustAccountFormFields>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty form — no values entered */
export const Default: Story = {};

/** Form pre-filled with values */
export const Filled: Story = {
  args: {
    name: 'Riverside Towers Phase 1',
    trustPurpose: TrustPurpose.SEVEN_PERCENT
  }
};

/** Form showing a submit error */
export const WithError: Story = {
  args: {
    name: 'Riverside Towers',
    trustPurpose: TrustPurpose.SEVEN_PERCENT,
    submitError: new Error('Failed to create trust account. Please try again.')
  }
};

/** Interactive — controlled inputs */
export const Interactive: Story = {
  render: args => {
    const [name, setName] = useState('');
    const [trustPurpose, setTrustPurpose] = useState('');
    return (
      <TrustAccountFormFields
        {...args}
        name={name}
        onNameChange={setName}
        trustPurpose={trustPurpose}
        onTrustPurposeChange={setTrustPurpose}
      />
    );
  }
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    name: 'מגדלי ריברסייד',
    trustPurpose: TrustPurpose.SEVEN_PERCENT
  }
};
