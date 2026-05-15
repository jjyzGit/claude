import {withHebrew} from '@/stories/i18n-decorators';

import {PageContent, PageLayout} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Layouts/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  decorators: [withHebrew]
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageLayout style={{height: '300px'}}>
      <PageContent>
        <p className="p-4 text-fg">Page content goes here</p>
      </PageContent>
    </PageLayout>
  )
};

export const WithMultipleContentSections: Story = {
  render: () => (
    <PageLayout style={{height: '400px'}}>
      <PageContent>
        <div className="flex flex-col gap-4 p-4">
          <div className="rounded-lg border border-border bg-background-surface p-4">
            <p className="text-fg">Section 1</p>
          </div>
          <div className="rounded-lg border border-border bg-background-surface p-4">
            <p className="text-fg">Section 2</p>
          </div>
          <div className="rounded-lg border border-border bg-background-surface p-4">
            <p className="text-fg">Section 3</p>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  )
};

export const Error: Story = {
  render: () => <PageLayout error style={{height: '400px'}} />
};

export const ErrorWithRetry: Story = {
  render: () => <PageLayout error refetch={() => {}} style={{height: '400px'}} />
};

export const PageContentOnly: Story = {
  name: 'PageContent (sub-component)',
  render: () => (
    <div className="flex h-48 flex-col" style={{height: '200px'}}>
      <PageContent>
        <p className="p-4 text-fg">Scrollable content area</p>
      </PageContent>
    </div>
  )
};
