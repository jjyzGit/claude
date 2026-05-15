import {TrustStatus} from '@sollapay/enums';
import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import {showTrustAccountActivatedToast} from '@/features/trust-accounts/components';

import {useTrustAccountsQuery} from './useTrustAccounts';

export function useTrustAccountActivatedToast() {
  const navigate = useNavigate();
  const {data: trustAccounts} = useTrustAccountsQuery();
  const prevStatusesRef = useRef<Map<string, TrustStatus>>(new Map());

  useEffect(() => {
    if (!trustAccounts) return;

    trustAccounts.forEach(account => {
      const prevStatus = prevStatusesRef.current.get(account.id);
      if (
        prevStatus !== undefined &&
        prevStatus !== TrustStatus.TRUST_ACTIVE &&
        account.trustStatus === TrustStatus.TRUST_ACTIVE
      ) {
        showTrustAccountActivatedToast(account.name, () =>
          navigate(`/trust-accounts/${account.id}`)
        );
      }
    });

    const next = new Map<string, TrustStatus>();
    trustAccounts.forEach(account => next.set(account.id, account.trustStatus));
    prevStatusesRef.current = next;
  }, [trustAccounts, navigate]);
}
