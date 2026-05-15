export const TRUST_ACCOUNT_VIEW_TABS = [
  'overview',
  'buyers',
  'transactions',
  'documents',
  'beneficiaries'
] as const;

export type TrustAccountViewTab = (typeof TRUST_ACCOUNT_VIEW_TABS)[number];
