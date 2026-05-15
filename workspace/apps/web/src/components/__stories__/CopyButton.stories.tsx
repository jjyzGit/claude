import {withHebrew} from '@/stories/i18n-decorators';

import {CopyButton} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    text: 'TR-9100'
  }
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    text: 'TR-9100',
    fieldName: 'Reference ID'
  }
};

export const WithContext: Story = {
  args: {
    text: 'TR-9100',
    fieldName: 'Reference ID'
  },
  render: args => (
    <div className="flex items-center gap-1 text-sm">
      <span>TR-9100</span>
      <CopyButton {...args} />
    </div>
  )
};
