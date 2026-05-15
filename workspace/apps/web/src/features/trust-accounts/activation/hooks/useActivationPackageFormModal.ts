import {PackageType} from '@sollapay/enums';
import {useEffect, useState} from 'react';

import {INITIAL_FORM_STATE, type FormStateSnapshot} from '@/hooks';

import {ACTIVATION_PACKAGE_TABS_METADATA} from '../config';

export type {FormStateSnapshot};

const buildInitialStepByTab = (): Record<PackageType, string> =>
  Object.fromEntries(
    Object.entries(ACTIVATION_PACKAGE_TABS_METADATA).map(([tab, {items}]) => [
      tab,
      Object.keys(items)[0] ?? ''
    ])
  ) as Record<PackageType, string>;

function resolveNavState(activeTab: PackageType, activeStep: string) {
  const stepsForActiveTab = Object.keys(ACTIVATION_PACKAGE_TABS_METADATA[activeTab].items);
  const hasSteps = stepsForActiveTab.length > 0;
  const currentStepIndex = hasSteps ? stepsForActiveTab.indexOf(activeStep) : -1;

  const isLastStep = !hasSteps || currentStepIndex === stepsForActiveTab.length - 1;
  const isLastTab = ENABLED_TAB_KEYS.indexOf(activeTab) === ENABLED_TAB_KEYS.length - 1;

  const isFirstStep = !hasSteps || currentStepIndex === 0;
  const isFirstTab = ENABLED_TAB_KEYS.indexOf(activeTab) === 0;

  return {
    stepsForActiveTab,
    hasSteps,
    currentStepIndex,
    isLastStep,
    isLastTab,
    isLastStepOfLastTab: isLastStep && isLastTab,
    isFirstStep,
    isFirstTab,
    isFirstStepOfFirstTab: isFirstStep && isFirstTab
  };
}

const TAB_KEYS = Object.keys(ACTIVATION_PACKAGE_TABS_METADATA) as PackageType[];
const ENABLED_TAB_KEYS = TAB_KEYS.filter(key => !ACTIVATION_PACKAGE_TABS_METADATA[key].comingSoon);
const TABS_DATA = Object.entries(ACTIVATION_PACKAGE_TABS_METADATA);

const toEnabledTab = (tab: PackageType): PackageType =>
  ENABLED_TAB_KEYS.includes(tab) ? tab : (ENABLED_TAB_KEYS[0] ?? tab);

export const useActivationPackageFormModal = (initialTab?: PackageType) => {
  const [activeTab, setActiveTab] = useState<PackageType>(
    toEnabledTab(initialTab ?? PackageType.TRUST_DETAILS)
  );
  const [stepByTab, setStepByTab] = useState<Record<PackageType, string>>(buildInitialStepByTab);
  const [formState, setFormState] = useState<FormStateSnapshot>(INITIAL_FORM_STATE);
  const [errorsByStep, setErrorsByStep] = useState<Record<string, boolean>>({});

  const activeStep = stepByTab[activeTab];

  const {
    stepsForActiveTab,
    hasSteps,
    currentStepIndex,
    isLastStep,
    isLastStepOfLastTab,
    isFirstStep,
    isFirstStepOfFirstTab
  } = resolveNavState(activeTab, activeStep);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(toEnabledTab(initialTab));
      setFormState(INITIAL_FORM_STATE);
    }
  }, [initialTab]);

  const handleTabChange = (tab: PackageType) => {
    setActiveTab(tab);
    setFormState(INITIAL_FORM_STATE);
  };

  const handleStepChange = (step: string) => {
    setStepByTab(prev => ({...prev, [activeTab]: step}));
  };

  const handleNextClick = async () => {
    if (formState.isDirty) {
      try {
        await formState.onSave();
      } catch {
        return;
      }
    }
    if (hasSteps && !isLastStep) {
      const nextStep = stepsForActiveTab[currentStepIndex + 1];
      if (nextStep) handleStepChange(nextStep);
    } else {
      const nextTab = ENABLED_TAB_KEYS[ENABLED_TAB_KEYS.indexOf(activeTab) + 1];
      if (nextTab) handleTabChange(nextTab);
    }
  };

  const handleBackClick = () => {
    if (hasSteps && !isFirstStep) {
      const prevStep = stepsForActiveTab[currentStepIndex - 1];
      if (prevStep) handleStepChange(prevStep);
    } else {
      const prevTabIndex = ENABLED_TAB_KEYS.indexOf(activeTab) - 1;
      const prevTab = ENABLED_TAB_KEYS[prevTabIndex];
      if (prevTab) {
        const prevTabSteps = Object.keys(ACTIVATION_PACKAGE_TABS_METADATA[prevTab].items);
        const lastStepOfPrevTab = prevTabSteps[prevTabSteps.length - 1];
        setActiveTab(prevTab);
        setFormState(INITIAL_FORM_STATE);
        if (lastStepOfPrevTab) {
          setStepByTab(prev => ({...prev, [prevTab]: lastStepOfPrevTab}));
        }
      }
    }
  };

  const tabsData = TABS_DATA.map(([key, {icon, labelKey, comingSoon}]) => ({
    value: key as PackageType,
    icon,
    labelKey,
    comingSoon
  }));

  const handleFormStateChange = (state: FormStateSnapshot) => {
    setFormState(state);
    setErrorsByStep(prev => ({...prev, [activeStep]: state.hasErrors}));
  };

  const handleStepError = (step: string, hasErrors: boolean) => {
    setErrorsByStep(prev => ({...prev, [step]: hasErrors}));
  };

  return {
    tabsData,
    activeTab,
    activeStep,
    formState,
    errorsByStep,
    onFormStateChange: handleFormStateChange,
    onStepError: handleStepError,
    handleTabChange,
    handleStepChange,
    handleNextClick,
    handleBackClick,
    isLastStepOfLastTab,
    isFirstStepOfFirstTab
  };
};
