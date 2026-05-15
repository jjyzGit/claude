import {useDisclosure, useDisclosureWithData} from '@sollapay/ui/hooks';
import {forwardRef, useCallback, useImperativeHandle} from 'react';

import {CreateTrustAccountModal} from './CreateTrustAccountModal';
import {DeleteTrustAccountModal} from './DeleteTrustAccountModal';
import {EditTrustAccountModal} from './EditTrustAccountModal';
import {useDeleteTrustAccountMutation} from '../hooks';

import type {TrustAccountListItemDTO} from '@sollapay/types';

export interface TrustAccountsPageModalsHandle {
  openCreate: () => void;
  openEdit: (account: TrustAccountListItemDTO) => void;
  openDelete: (account: TrustAccountListItemDTO) => void;
}

interface TrustAccountsPageModalsProps {
  onCreateSuccess?: (id: string, name: string) => void;
}

export const TrustAccountsPageModals = forwardRef<
  TrustAccountsPageModalsHandle,
  TrustAccountsPageModalsProps
>(({onCreateSuccess}, ref) => {
  const createModal = useDisclosure();
  const editModal = useDisclosureWithData<TrustAccountListItemDTO>();
  const deleteModal = useDisclosureWithData<TrustAccountListItemDTO>();
  const deleteAccountMutation = useDeleteTrustAccountMutation();

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteModal.data) {
      return;
    }

    try {
      await deleteAccountMutation.mutateAsync(deleteModal.data.id);
      deleteModal.close();
    } catch {
      // Keep modal open so user can retry/cancel — error shown via mutation.error
    }
  }, [deleteModal, deleteAccountMutation]);

  const handleCreateSuccess = useCallback(
    (id: string, name: string) => {
      onCreateSuccess?.(id, name);

      createModal.close();
    },
    [onCreateSuccess, createModal]
  );

  useImperativeHandle(
    ref,
    () => ({
      openCreate: createModal.open,
      openEdit: editModal.open,
      openDelete: deleteModal.open
    }),
    [createModal, editModal, deleteModal]
  );

  return (
    <>
      <EditTrustAccountModal account={editModal.data} onClose={editModal.close} />
      <CreateTrustAccountModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSuccess={handleCreateSuccess}
      />
      <DeleteTrustAccountModal
        accountName={deleteModal.data?.name ?? null}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          deleteAccountMutation.reset();
          deleteModal.close();
        }}
        isLoading={deleteAccountMutation.isPending}
        error={deleteAccountMutation.error}
      />
    </>
  );
});

TrustAccountsPageModals.displayName = 'TrustAccountsPageModals';
