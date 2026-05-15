import {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import type {TrustAccountViewTab} from '../utils';

export const useNavigateToTab = (): ((tab: TrustAccountViewTab) => void) => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  return useCallback(
    (tab: TrustAccountViewTab) => navigate(`/trust-accounts/${id}/${tab}`, {replace: true}),
    [navigate, id]
  );
};
