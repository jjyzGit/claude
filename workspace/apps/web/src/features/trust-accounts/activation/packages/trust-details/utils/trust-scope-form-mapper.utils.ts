import {parseMoney} from '@sollapay/utils';

import type {PayinType, PayoutType, TimeLength} from '@sollapay/enums';
import type {TrustScopeDetailsDTO} from '@sollapay/types';

export interface TrustScopeFormValues {
  timeLength: TimeLength | '';
  volume: string;
  payoutTypes: PayoutType[];
  payoutOtherText: string;
  payinTypes: PayinType[];
  payinOtherText: string;
}

export const EMPTY_TRUST_SCOPE_FORM_VALUES: TrustScopeFormValues = {
  timeLength: '',
  volume: '',
  payoutTypes: [],
  payoutOtherText: '',
  payinTypes: [],
  payinOtherText: ''
};

export const toTrustScopeFormValues = (
  scope: TrustScopeDetailsDTO | null | undefined
): TrustScopeFormValues => {
  if (!scope) {
    return EMPTY_TRUST_SCOPE_FORM_VALUES;
  }

  return {
    timeLength: scope.timeLength ?? '',
    volume: scope.volume
      ? parseMoney(scope.volume)
          .toString()
          .replace(/\.\d+$/, '')
      : '',
    payoutTypes: scope.payoutTypes ?? [],
    payoutOtherText: scope.payoutOtherText ?? '',
    payinTypes: scope.payinTypes ?? [],
    payinOtherText: scope.payinOtherText ?? ''
  };
};

export const toTrustScopeDetailsDTO = (values: TrustScopeFormValues): TrustScopeDetailsDTO => ({
  timeLength: (values.timeLength as TimeLength) || null,
  volume: values.volume.trim() || null,
  payoutTypes: values.payoutTypes.length > 0 ? values.payoutTypes : [],
  payoutOtherText: values.payoutOtherText.trim() || '',
  payinTypes: values.payinTypes.length > 0 ? values.payinTypes : [],
  payinOtherText: values.payinOtherText.trim() || ''
});
