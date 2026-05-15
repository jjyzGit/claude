import {withHebrew} from '@/stories/i18n-decorators';

import {FormShell} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Components/FormShell',
  component: FormShell,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  decorators: [withHebrew],
  args: {
    id: 'example-form',
    onSubmit: e => {
      e.preventDefault();
    },
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="Enter email"
          />
        </div>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          type="submit"
        >
          Save
        </button>
      </div>
    )
  }
} satisfies Meta<typeof FormShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRequiredLegend: Story = {
  args: {
    showRequiredLegend: true
  }
};

export const WithError: Story = {
  args: {
    saveError: new Error('Failed to save. Please check your connection and try again.')
  }
};
