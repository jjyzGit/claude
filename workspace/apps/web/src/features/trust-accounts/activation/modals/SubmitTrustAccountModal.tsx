import {Button, Divider, Icon, Modal, Spinner, Typography} from '@sollapay/ui/components';
import {SaveMoneyIllustration, SecureDocumentIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import {useDirection} from '@/lib/i18n/hooks';

import type {FC} from 'react';

type SubmitTrustAccountModalState = 'confirm' | 'success';

export type SubmitTrustAccountModalProps = {
  isOpen: boolean;
  state: SubmitTrustAccountModalState;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const SubmitTrustAccountModal: FC<SubmitTrustAccountModalProps> = ({
  isOpen,
  state,
  onConfirm,
  onClose,
  isLoading = false
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const direction = useDirection();
  const isSuccess = state === 'success';

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      illustration={isSuccess ? <SaveMoneyIllustration /> : <SecureDocumentIllustration />}
      title={
        isSuccess
          ? t('activation.successSubmitModal.title')
          : t('activation.confirmSubmitModal.title')
      }
      description={
        isSuccess
          ? t('activation.successSubmitModal.description')
          : t('activation.confirmSubmitModal.description')
      }
      footer={
        isSuccess ? (
          <Button variant="primary" size="stretch" onClick={onClose}>
            {t('activation.successSubmitModal.close')}
          </Button>
        ) : (
          <>
            <Button variant="secondary" size="stretch" onClick={onClose}>
              {t('activation.confirmSubmitModal.cancel')}
            </Button>
            <Button variant="primary" size="stretch" onClick={onConfirm} disabled={isLoading}>
              {t('activation.confirmSubmitModal.confirm')}
              {isLoading ? (
                <Spinner className="size-4" aria-label={t('common:loading')} />
              ) : direction === 'rtl' ? (
                <Icon name="arrow-left" />
              ) : (
                <Icon name="arrow-right" />
              )}
            </Button>
          </>
        )
      }
    >
      {isSuccess ? (
        <ActivationSuccessSummaryCard
          statusLabel={t('activation.successSubmitModal.statusValue')}
          etaLabel={t('activation.eta')}
        />
      ) : (
        <Divider className="bg-border-subtle" />
      )}
    </Modal>
  );
};

type ActivationSuccessSummaryCardProps = {
  statusLabel: string;
  etaLabel: string;
};

export const ActivationSuccessSummaryCard: FC<ActivationSuccessSummaryCardProps> = ({
  statusLabel,
  etaLabel
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-background-secondary p-4.25">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-background-success">
          <Icon name="check-circle" className="size-4 shrink-0 text-text-success" />
        </div>
        <Typography as="span" size="sm" weight="semibold" color="default">
          {statusLabel}
        </Typography>
      </div>

      <div className="rounded-md border border-border-subtle bg-background-secondary px-2.75 py-1.25">
        <div className="flex items-center gap-1.5">
          <Icon name="clock" className="size-4 shrink-0 text-fg-secondary" />
          <Typography as="span" size="xs" weight="semibold" color="secondary">
            {etaLabel}
          </Typography>
        </div>
      </div>
    </div>
  );
};
