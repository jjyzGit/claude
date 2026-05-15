import {Modal} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {IconName} from '@sollapay/ui/components';
import type {FC, ReactNode} from 'react';

type ConfirmActionModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  icon?: IconName;
  iconVariant?: 'brand' | 'destructive';
  primaryVariant?: 'primary' | 'destructive';
  showCloseButton?: boolean;
  children?: ReactNode;
};

export const ConfirmActionModal: FC<ConfirmActionModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
  isLoading = false,
  icon = 'delete' as const,
  iconVariant = 'destructive',
  primaryVariant = 'destructive',
  showCloseButton = true,
  children
}) => {
  const {t} = useTranslation();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      icon={icon}
      iconVariant={iconVariant}
      title={title}
      description={description}
      primaryLabel={onConfirm ? (confirmLabel ?? t('confirm')) : undefined}
      primaryVariant={primaryVariant}
      primaryDisabled={isLoading}
      onPrimaryAction={onConfirm}
      secondaryLabel={onClose ? (cancelLabel ?? t('cancel')) : undefined}
      onSecondaryAction={onClose}
      showCloseButton={showCloseButton}
      size="sm"
    >
      {children}
    </Modal>
  );
};
