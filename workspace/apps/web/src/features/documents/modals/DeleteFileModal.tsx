import {useTranslation} from 'react-i18next';

import {ConfirmActionModal} from '@/components';

import type {FC} from 'react';

type DeleteFileModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const DeleteFileModal: FC<DeleteFileModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  isLoading
}) => {
  const {t} = useTranslation();

  return (
    <ConfirmActionModal
      isOpen={isOpen}
      title={t('documents.deleteFileTitle')}
      description={t('documents.deleteFileDescription')}
      confirmLabel={t('documents.deleteFileConfirm')}
      onConfirm={onConfirm}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};
