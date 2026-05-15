import {withHebrew} from '@/stories/i18n-decorators';

import {ErrorAlertMessage} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/ErrorAlertMessage',
  component: ErrorAlertMessage,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    error: new Error('Something went wrong. Please try again.')
  }
} satisfies Meta<typeof ErrorAlertMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
