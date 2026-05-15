import {Button, ContentSection} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/ContentSection',
  component: ContentSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  args: {
    title: 'Section Title',
    children: <div className="h-24 rounded border border-dashed border-gray-300" />
  }
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    subtitle: 'A helpful description of this section'
  }
};

export const WithAction: Story = {
  args: {
    subtitle: 'A helpful description of this section',
    action: (
      <Button variant="secondary" size="sm">
        Action
      </Button>
    )
  }
};

export const RTL: Story = {
  decorators: [withHebrew],
  args: {
    title: 'כותרת סעיף',
    subtitle: 'תיאור הסעיף'
  }
};
