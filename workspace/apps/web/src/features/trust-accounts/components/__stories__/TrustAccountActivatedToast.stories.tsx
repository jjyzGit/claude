import {Button, Toaster} from '@sollapay/ui/components';

import {withHebrew} from '@/stories/i18n-decorators';

import {TrustAccountActivatedToast, showTrustAccountActivatedToast} from '..';

import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta<typeof TrustAccountActivatedToast> = {
  title: 'Features/TrustAccounts/TrustAccountActivatedToast',
  component: TrustAccountActivatedToast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    toastId: 'story-toast',
    trustName: 'פרויקט המגדל',
    onNavigate: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Hebrew: Story = {
  decorators: [withHebrew]
};

export const English: Story = {
  args: {
    trustName: 'Tower Project'
  }
};

export const HebrewLongName: Story = {
  decorators: [withHebrew],
  args: {
    trustName: 'פרויקט הדיור המשותף בשכונת רמת אביב הצפונית'
  }
};

export const EnglishLongName: Story = {
  args: {
    trustName: 'North Ramat Aviv Cooperative Housing Development Project'
  }
};

export const Animated: Story = {
  decorators: [withHebrew],
  render: () => (
    <>
      <Toaster position="bottom-center" />
      <Button
        variant="secondary"
        onClick={() => showTrustAccountActivatedToast('פרויקט המגדל', () => {})}
      >
        הפעל חשבון נאמנות
      </Button>
    </>
  )
};

export const Multiple: Story = {
  decorators: [withHebrew],
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <TrustAccountActivatedToast
        toastId="toast-1"
        trustName="פרויקט המגדל"
        onNavigate={() => {}}
      />
      <TrustAccountActivatedToast
        toastId="toast-2"
        trustName="פרויקט הדיור"
        onNavigate={() => {}}
      />
      <TrustAccountActivatedToast
        toastId="toast-3"
        trustName="פרויקט הדיור המשותף בשכונת רמת אביב הצפונית"
        onNavigate={() => {}}
      />
    </div>
  )
};
