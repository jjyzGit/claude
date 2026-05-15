import {withHebrew} from '@/stories/i18n-decorators';

import {DilutionCalculatorPage} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta = {
  title: 'Pages/DilutionCalculatorPage',
  component: DilutionCalculatorPage,
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'}
} satisfies Meta<typeof DilutionCalculatorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hebrew: Story = {
  decorators: [withHebrew]
};
