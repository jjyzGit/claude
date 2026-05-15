import {useAuth0} from '@auth0/auth0-react';
import {HttpClient} from '@sollapay/http-client';
import {useMemo} from 'react';

import {config} from '@/app';

/**
 * Custom hook to create an authenticated API client using HttpClient.
 * Memoized so the same instance is returned across renders.
 */
export function useApiClient() {
  const {getAccessTokenSilently} = useAuth0();

  return useMemo(
    () =>
      new HttpClient({
        baseUrl: `${config.apiUrl}/v1/api`,
        getToken: getAccessTokenSilently
      }),
    [getAccessTokenSilently]
  );
}
