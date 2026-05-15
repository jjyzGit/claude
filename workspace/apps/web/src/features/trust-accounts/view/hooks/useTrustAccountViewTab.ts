import {useParams} from 'react-router-dom';

import {TRUST_ACCOUNT_VIEW_TABS} from '../utils';
import {useNavigateToTab} from './useNavigateToTab';

import type {TrustAccountViewTab} from '../utils';

interface UseTrustAccountViewTabResult {
  activeTab: TrustAccountViewTab;
  handleTabChange: (tab: TrustAccountViewTab) => void;
}

const resolveActiveTab = (tabParam: string | undefined): TrustAccountViewTab =>
  TRUST_ACCOUNT_VIEW_TABS.includes(tabParam as TrustAccountViewTab)
    ? (tabParam as TrustAccountViewTab)
    : 'overview';

export const useTrustAccountViewTab = (): UseTrustAccountViewTabResult => {
  const {tab} = useParams<{tab?: string}>();
  const activeTab = resolveActiveTab(tab);
  const handleTabChange = useNavigateToTab();
  return {activeTab, handleTabChange};
};
