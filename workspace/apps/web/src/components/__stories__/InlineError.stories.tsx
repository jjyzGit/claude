import {withHebrew} from '@/stories/i18n-decorators';

import {InlineError} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/InlineError',
  component: InlineError,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    error: new Error('This field is required.')
  }
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
