import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider
} from '@tanstack/react-query';

import type {FC, PropsWithChildren} from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

export const QueryClientProvider: FC<PropsWithChildren> = ({children}) => {
  return <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>;
};
