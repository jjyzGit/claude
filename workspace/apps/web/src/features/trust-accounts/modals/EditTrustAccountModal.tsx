import {Modal} from '@sollapay/ui/components';
import {GrowYourMoneyIllustration} from '@sollapay/ui/illustrations';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {TrustAccountFormFields} from '../components';
import {useUpdateTrustAccountMutation} from '../hooks';

import type {TrustPurpose} from '@sollapay/enums';
import type {TrustAccountListItemDTO} from '@sollapay/types';
import type {FC} from 'react';

type EditTrustAccountModalProps = {
  account: TrustAccountListItemDTO | null;
  onClose: () => void;
};

export const EditTrustAccountModal: FC<EditTrustAccountModalProps> = ({account, onClose}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const updateMutation = useUpdateTrustAccountMutation(account?.id ?? '');

  const [name, setName] = useState('');
  const [trustPurpose, setTrustPurpose] = useState('');
  const [submitError, setSubmitError] = useState<unknown>(null);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setTrustPurpose(account.trustPurpose ?? '');
      setSubmitError(null);
    }
  }, [account]);

  const hasChanges =
    account !== null &&
    (name.trim() !== account.name || trustPurpose !== (account.trustPurpose ?? ''));

  const canSave = name.trim().length > 0 && trustPurpose.length > 0 && hasChanges;

  const handleSave = async () => {
    if (!canSave) return;

    setSubmitError(null);

    try {
      await updateMutation.mutateAsync({
        trustName: name.trim(),
        trustPurpose: trustPurpose as TrustPurpose
      });
      onClose();
    } catch (error) {
      setSubmitError(error);
    }
  };

  const {isPending} = updateMutation;

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) handleClose();
  };

  return (
    <Modal
      isOpen={account !== null}
      onOpenChange={handleOpenChange}
      illustration={<GrowYourMoneyIllustration />}
      iconVariant="brand"
      title={t('editModal.title')}
      primaryLabel={t('editModal.save')}
      primaryDisabled={!canSave || isPending}
      onPrimaryAction={handleSave}
      secondaryLabel={t('common:cancel')}
      onSecondaryAction={handleClose}
    >
      <TrustAccountFormFields
        name={name}
        onNameChange={setName}
        trustPurpose={trustPurpose}
        onTrustPurposeChange={setTrustPurpose}
        submitError={submitError}
      />
    </Modal>
  );
};
