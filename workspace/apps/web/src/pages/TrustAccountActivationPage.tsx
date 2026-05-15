import {Skeleton} from '@sollapay/ui/components';
import {useDisclosure} from '@sollapay/ui/hooks';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {PageContent, PageLayout} from '@/layouts';

import {
  ActivationGlobalCta,
  ActivationPageHeader,
  ActivationPageHeaderSection,
  ActivationPackageList,
  ActivationProgressBar
} from '../features/trust-accounts/activation/components';
import {ActivationPackageListSkeleton} from '../features/trust-accounts/activation/components/ActivationPackageList.skeleton';
import {ACTIVATION_PACKAGE_CONFIG} from '../features/trust-accounts/activation/config';
import {
  useActivationViewModel,
  usePackageFormModal,
  useSubmitTrustAccountMutation
} from '../features/trust-accounts/activation/hooks';
import {
  ActivationPackageFormModal,
  SubmitTrustAccountModal
} from '../features/trust-accounts/activation/modals';
import {
  isPackageActionable,
  isPackageInProgress
} from '../features/trust-accounts/activation/utils';

import type {PackageType} from '@sollapay/enums';
import type {FC} from 'react';

export const TrustAccountActivationPage: FC = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    refetch,
    packages,
    canSendPackages,
    isSubmittedForReview,
    isTrustActive,
    trustAccount
  } = useActivationViewModel(id ?? '');
  const submitTrustAccountMutation = useSubmitTrustAccountMutation(id ?? '');
  const flowModal = useDisclosure();
  const packageFormModal = usePackageFormModal(id ?? '');
  const [isActivationSuccess, setIsActivationSuccess] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState<PackageType | null>(null);

  const handlePackageNavigate = (packageType: PackageType) => {
    if (!id) return;
    setSelectedPackageType(packageType);
    packageFormModal.open();
  };

  const hasProgress = packages.some(isPackageInProgress);

  const handleGlobalCta = () => {
    if (isTrustActive) {
      navigate(`/trust-accounts/${id}`);
      return;
    }
    if (canSendPackages) {
      setIsActivationSuccess(false);
      flowModal.open();
    } else {
      const firstIncomplete = packages.find(isPackageActionable);
      if (firstIncomplete) handlePackageNavigate(firstIncomplete.type);
    }
  };

  const handleConfirmSend = () => {
    submitTrustAccountMutation.mutate(undefined, {
      onSuccess: () => {
        setIsActivationSuccess(true);
      }
    });
  };

  const handleCloseFlowModal = () => {
    setIsActivationSuccess(false);
    flowModal.close();
  };

  return (
    <PageLayout error={isError} refetch={() => void refetch()}>
      <ActivationPageHeaderSection trustAccount={trustAccount} />

      <PageContent>
        <section
          className="flex flex-col items-center gap-6"
          data-slot="trust-account-activation-page"
        >
          <div
            className="relative w-full max-w-2xl overflow-clip rounded-xl border border-border bg-background-surface shadow-xs"
            data-slot="activation-card"
          >
            <ActivationProgressBar packages={packages} />
            <ActivationPageHeader />
            {isLoading ? (
              <ActivationPackageListSkeleton />
            ) : (
              <ActivationPackageList
                packages={packages}
                packageConfig={ACTIVATION_PACKAGE_CONFIG}
                onPackageNavigate={handlePackageNavigate}
                isSubmittedForReview={isSubmittedForReview}
              />
            )}
            {isLoading ? (
              <div className="px-8 pb-8">
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            ) : (
              <ActivationGlobalCta
                isVisible={!isSubmittedForReview || isTrustActive}
                onClick={handleGlobalCta}
                isReadyToSubmit={canSendPackages}
                hasProgress={hasProgress}
                isLoading={submitTrustAccountMutation.isPending}
                isTrustActive={isTrustActive}
              />
            )}
          </div>
        </section>
      </PageContent>

      <SubmitTrustAccountModal
        isOpen={flowModal.isOpen}
        state={isActivationSuccess ? 'success' : 'confirm'}
        onConfirm={handleConfirmSend}
        onClose={handleCloseFlowModal}
        isLoading={submitTrustAccountMutation.isPending}
      />

      <ActivationPackageFormModal
        trustAccountId={id ?? ''}
        isOpen={packageFormModal.isOpen}
        onClose={packageFormModal.close}
        initialTab={selectedPackageType ?? undefined}
        packages={packages}
        readOnly={isSubmittedForReview}
        showErrors={hasProgress}
      />
    </PageLayout>
  );
};
