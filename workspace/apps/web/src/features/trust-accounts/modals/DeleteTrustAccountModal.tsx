import {useTranslation} from 'react-i18next';

import {InlineError, ConfirmActionModal} from '@/components';

import type {FC} from 'react';

type DeleteTrustAccountModalProps = {
  /** Account name to include in the confirmation message */
  accountName: string | null;
  /** Called when the user confirms the deletion */
  onConfirm: () => void;
  /** Called when the user cancels or the modal closes */
  onClose: () => void;
  /** Show a loading state on the confirm button */
  isLoading?: boolean;
  /** Error from the delete mutation, if any */
  error?: unknown;
};

export const DeleteTrustAccountModal: FC<DeleteTrustAccountModalProps> = ({
  accountName,
  onConfirm,
  onClose,
  isLoading = false,
  error
}) => {
  const {t} = useTranslation('trustAccounts');
  const description = accountName
    ? t('deleteModal.description', {name: accountName})
    : t('deleteModal.descriptionGeneric');

  return (
    <ConfirmActionModal
      isOpen={accountName !== null}
      title={t('deleteModal.title')}
      description={description}
      confirmLabel={t('deleteModal.confirm')}
      onConfirm={onConfirm}
      onClose={onClose}
      isLoading={isLoading}
    >
      {error != null && <InlineError error={error} />}
    </ConfirmActionModal>
  );
};
