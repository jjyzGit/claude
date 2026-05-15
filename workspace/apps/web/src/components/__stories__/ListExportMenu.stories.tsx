import {withHebrew} from '@/stories/i18n-decorators';

import {ListExportMenu} from '..';

import type {ExportColumn} from '@/utils';
import type {Meta, StoryObj} from '@storybook/react-vite';

type StoryRow = {name: string; amount: string; date: string};

const columns: ExportColumn<StoryRow>[] = [
  {header: 'Name', value: row => row.name},
  {header: 'Amount', value: row => row.amount},
  {header: 'Date', value: row => row.date}
];

const rows: StoryRow[] = [
  {name: 'Alice Cohen', amount: '₪10,000', date: '01/01/2026'},
  {name: 'Bob Levi', amount: '₪20,000', date: '15/02/2026'},
  {name: 'Carol Mizrahi', amount: '₪30,000', date: '10/03/2026'}
];

const meta = {
  title: 'Components/ListExportMenu',
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  decorators: [withHebrew],
  render: args => (
    <ListExportMenu<StoryRow>
      rows={args.rows as StoryRow[]}
      columns={columns}
      refId="TA-001"
      entity="demo"
      sheetName="Demo"
      disabled={args.disabled}
    />
  ),
  args: {
    rows,
    disabled: false
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {disabled: true}
};

export const EmptyRows: Story = {
  args: {rows: [], disabled: true}
};
