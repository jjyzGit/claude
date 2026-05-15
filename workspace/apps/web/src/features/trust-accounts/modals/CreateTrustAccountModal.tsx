import {Modal} from '@sollapay/ui/components';
import {GrowYourMoneyIllustration} from '@sollapay/ui/illustrations';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {TrustAccountFormFields} from '../components';
import {useCreateTrustAccountMutation} from '../hooks';

import type {TrustPurpose} from '@sollapay/enums';
import type {FC} from 'react';

type CreateTrustAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: string, name: string) => void;
};

export const CreateTrustAccountModal: FC<CreateTrustAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const createTrustAccountMutation = useCreateTrustAccountMutation();

  const [name, setName] = useState('');
  const [trustPurpose, setTrustPurpose] = useState('');
  const [submitError, setSubmitError] = useState<unknown>(null);

  const canContinue = name.trim().length > 0 && trustPurpose.length > 0;

  const handleContinue = async () => {
    if (!canContinue) return;

    setSubmitError(null);

    try {
      const trustName = name.trim();
      const response = await createTrustAccountMutation.mutateAsync({
        trustName,
        trustPurpose: trustPurpose as TrustPurpose
      });

      setName('');
      setTrustPurpose('');
      onClose();
      onSuccess(response.data.id, trustName);
    } catch (error) {
      setSubmitError(error);
    }
  };

  const {isPending} = createTrustAccountMutation;

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      illustration={<GrowYourMoneyIllustration />}
      iconVariant="brand"
      title={t('modal.title')}
      primaryLabel={t('modal.continue')}
      primaryDisabled={!canContinue || isPending}
      onPrimaryAction={handleContinue}
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
