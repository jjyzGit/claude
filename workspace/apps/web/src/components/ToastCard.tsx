import {cn} from '@sollapay/ui';
import {Button, Icon, IconBox, Typography} from '@sollapay/ui/components';

import type {IconName} from '@sollapay/ui/components';
import type {FC} from 'react';

type ToastCardVariant = 'success' | 'warning';

const variantIconBoxClass: Record<ToastCardVariant, string> = {
  success: 'bg-indication-success border-border-on-indication',
  warning: 'bg-indication-warning border-border-on-indication'
};

const variantIconClass: Record<ToastCardVariant, string> = {
  success: 'text-fg-on-indication',
  warning: 'text-fg-on-indication'
};

export type ToastCardProps = {
  iconName: IconName;
  variant?: ToastCardVariant;
  title: string;
  description: string;
  onNavigate: () => void;
  onClose: () => void;
  closeLabel: string;
};

export const ToastCard: FC<ToastCardProps> = ({
  iconName,
  variant = 'success',
  title,
  description,
  onNavigate,
  onClose,
  closeLabel
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleNavigate = () => {
    onNavigate();
    onClose();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleNavigate();
      }}
      data-slot="toast-card"
      className={cn(
        'flex cursor-pointer items-start gap-4',
        'rounded-xl border border-border bg-background-surface p-4 shadow-xs',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
      )}
    >
      <IconBox
        icon={iconName}
        size="md"
        className={variantIconBoxClass[variant]}
        iconClassName={variantIconClass[variant]}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1 text-start">
        <Typography size="sm" weight="semibold" color="secondary">
          {title}
        </Typography>
        <Typography size="sm" color="tertiary">
          {description}
        </Typography>
      </div>

      <Button
        type="button"
        variant="tertiary"
        size="icon-sm"
        onClick={handleClose}
        aria-label={closeLabel}
        className="self-start items-start justify-end pb-2 ps-2 hover:bg-transparent"
      >
        <Icon name="x-close" width={20} height={20} />
      </Button>
    </div>
  );
};
