import {PackageType} from '@sollapay/enums';
import {
  Badge,
  Icon,
  ModalTabIconLabel,
  MultiStepsModal,
  Spinner,
  Typography
} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {
  ShowErrorsContext,
  useActivationPackageFormModal
} from '@/features/trust-accounts/activation/hooks';
import {
  TrustAccountActivationComplianceForm,
  TrustAccountActivationDetailsForm,
  TrustAccountActivationKycForm
} from '@/features/trust-accounts/activation/packages';

import {ActivationPackageStepsNav} from '../components';
import {
  ACTIVATION_PACKAGE_CANCEL_BUTTON_METADATA,
  ACTIVATION_PACKAGE_SAVE_BUTTON_METADATA,
  ACTIVATION_PACKAGE_TABS_METADATA
} from '../config';

import type {ComplianceStep, StepsMap, TrustDetailsStep} from '../config';
import type {ActivationPackageViewModel} from '../hooks';
import type {CustomButtonConfig, TabItem} from '@sollapay/ui/components';
import type {FC} from 'react';

type ActivationPackageFormModalProps = {
  trustAccountId: string;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PackageType;
  packages?: ActivationPackageViewModel[];
  disableFocusTrap?: boolean;
  readOnly?: boolean;
  showErrors?: boolean;
};

export const ActivationPackageFormModal: FC<ActivationPackageFormModalProps> = ({
  trustAccountId,
  isOpen,
  onClose,
  initialTab,
  packages = [],
  disableFocusTrap = false,
  readOnly = false,
  showErrors = true
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const {
    tabsData,
    activeTab,
    activeStep,
    formState,
    errorsByStep,
    onFormStateChange,
    onStepError,
    handleTabChange,
    handleStepChange,
    handleNextClick,
    handleBackClick,
    isLastStepOfLastTab,
    isFirstStepOfFirstTab
  } = useActivationPackageFormModal(initialTab);

  const tabs: TabItem[] = tabsData.map(({value, icon, labelKey, comingSoon}) => {
    const pkg = packages.find(p => p.type === value);
    const completed = pkg?.readiness.isReady ?? false;
    return {
      value,
      disabled: comingSoon,
      label: (
        <ModalTabIconLabel
          icon={icon}
          text={t(labelKey)}
          completed={completed}
          disabled={comingSoon}
          badge={
            comingSoon ? (
              <Badge variant="gray" size="sm">
                {t('common:comingSoon')}
              </Badge>
            ) : undefined
          }
        />
      )
    };
  });

  const activeTabConfig = ACTIVATION_PACKAGE_TABS_METADATA[activeTab];

  const {isDirty, isLoading, isError, isSaving, onSave, onCancel} = formState;

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <ShowErrorsContext.Provider value={showErrors}>
      <MultiStepsModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={t('activation.packageFormModal.title')}
        disableFocusTrap={disableFocusTrap}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tab: string) => handleTabChange(tab as PackageType)}
        nextLabel={
          isLastStepOfLastTab
            ? t('activation.packageFormModal.finish')
            : t('activation.packageFormModal.next')
        }
        backLabel={t('activation.packageFormModal.back')}
        onNextClick={isLastStepOfLastTab ? onClose : handleNextClick}
        nextIsLoading={!isLastStepOfLastTab && isSaving}
        nextDisabled={!isLastStepOfLastTab && isSaving}
        nextHideIcon={isLastStepOfLastTab}
        onBackClick={isFirstStepOfFirstTab ? undefined : handleBackClick}
        subHeader={
          Object.keys(activeTabConfig.items).length > 0 ? (
            <ActivationPackageStepsNav
              items={activeTabConfig.items as StepsMap}
              value={activeStep}
              onChange={handleStepChange}
              errorsMap={showErrors ? errorsByStep : {}}
            />
          ) : undefined
        }
        customButtons={
          readOnly
            ? []
            : [
                {
                  label: t(ACTIVATION_PACKAGE_CANCEL_BUTTON_METADATA.labelKey),
                  icon: <Icon name="close" width={20} height={20} />,
                  isDestructive: ACTIVATION_PACKAGE_CANCEL_BUTTON_METADATA.isDestructive,
                  isHidden: !isDirty || isSaving,
                  onClick: () => onCancel()
                } satisfies CustomButtonConfig,
                {
                  label: t(ACTIVATION_PACKAGE_SAVE_BUTTON_METADATA.labelKey),
                  icon: <Icon name="save" width={20} height={20} />,
                  isDisabled: !isDirty,
                  isLoading: isSaving,
                  onClick: () => onSave()
                } satisfies CustomButtonConfig
              ]
        }
      >
        <div className="flex flex-col">
          <div className="py-4 px-6" data-slot="activation-package-form-body">
            {isLoading && (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background-surface p-6">
                <Spinner className="size-4 text-fg-tertiary" aria-label={t('common:loading')} />
                <Typography as="p" size="sm" color="tertiary">
                  {t('common:loading')}
                </Typography>
              </div>
            )}

            {isError && (
              <div className="rounded-xl border border-border bg-background-surface p-6">
                <Typography as="p" size="sm" className="text-destructive">
                  {t('errorLoadingDetails')}
                </Typography>
              </div>
            )}

            <fieldset disabled={readOnly} className={readOnly ? 'pointer-events-none' : 'contents'}>
              <div hidden={isLoading || isError}>
                {activeTab === PackageType.TRUST_DETAILS && (
                  <TrustAccountActivationDetailsForm
                    trustAccountId={trustAccountId}
                    activeStep={activeStep as TrustDetailsStep}
                    onFormStateChange={onFormStateChange}
                    onStepError={onStepError}
                  />
                )}
                {activeTab === PackageType.COMPLIANCE && (
                  <TrustAccountActivationComplianceForm
                    trustAccountId={trustAccountId}
                    activeStep={activeStep as ComplianceStep}
                    onFormStateChange={onFormStateChange}
                    onStepError={onStepError}
                  />
                )}
                {activeTab === PackageType.KYC && (
                  <TrustAccountActivationKycForm
                    trustAccountId={trustAccountId}
                    activeStep={activeStep}
                    onFormStateChange={onFormStateChange}
                  />
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </MultiStepsModal>
    </ShowErrorsContext.Provider>
  );
};
