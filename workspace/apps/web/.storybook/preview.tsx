import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {withEnglish} from '../src/stories/i18n-decorators';

import type {Preview, StoryFn} from '@storybook/react-vite';

import '../src/index.css';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: false}, mutations: {retry: false}}
});

const withQueryClient = (Story: StoryFn) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const preview: Preview = {
  decorators: [withQueryClient, withEnglish],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
};

export default preview;
