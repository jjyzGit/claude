import {useDisclosure} from '@sollapay/ui/hooks';
import {useQueryClient} from '@tanstack/react-query';

import {trustAccountKeys} from '@/features/trust-accounts/hooks';

export function usePackageFormModal(trustAccountId: string) {
  const disclosure = useDisclosure();
  const queryClient = useQueryClient();

  const close = () => {
    disclosure.close();
    queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(trustAccountId)});
  };

  return {...disclosure, close};
}
