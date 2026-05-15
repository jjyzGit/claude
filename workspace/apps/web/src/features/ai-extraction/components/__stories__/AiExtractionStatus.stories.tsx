import {withEnglish, withHebrew} from '@/stories/i18n-decorators';

import {AiExtractionStatus} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Features/AiExtraction/AiExtractionStatus',
  component: AiExtractionStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [withEnglish]
} satisfies Meta<typeof AiExtractionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Processing: Story = {
  args: {
    isProcessing: true,
    suggestionsCount: 0
  }
};

export const Completed: Story = {
  args: {
    isProcessing: false,
    suggestionsCount: 5
  }
};

export const Hidden: Story = {
  args: {
    isProcessing: false,
    suggestionsCount: 0
  }
};

export const ProcessingRTL: Story = {
  args: {
    isProcessing: true,
    suggestionsCount: 0
  },
  decorators: [withHebrew]
};

export const CompletedRTL: Story = {
  args: {
    isProcessing: false,
    suggestionsCount: 3
  },
  decorators: [withHebrew]
};
