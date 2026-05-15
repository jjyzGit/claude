import {useState} from 'react';

import {withHebrew} from '@/stories/i18n-decorators';

import {DeleteFileModal} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/Documents/DeleteFileModal',
  component: DeleteFileModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  args: {
    isOpen: false,
    onConfirm: () => {},
    onClose: () => {}
  }
} satisfies Meta<typeof DeleteFileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Modal rendered in its open state */
export const Open: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <DeleteFileModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    );
  }
};

/** Loading state while deletion is in progress */
export const Loading: Story = {
  render: args => <DeleteFileModal {...args} isOpen={true} isLoading={true} />
};

/** RTL (Hebrew) */
export const RTL: Story = {
  decorators: [withHebrew],
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <DeleteFileModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    );
  }
};
