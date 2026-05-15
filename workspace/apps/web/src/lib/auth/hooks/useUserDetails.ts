import {useAuth0} from '@auth0/auth0-react';

import {config} from '@/app';

interface OrgDetails {
  id: string;
  name: string;
  displayName?: string | null;
  logoUrl?: string | null;
}

interface UserDetails {
  user: ReturnType<typeof useAuth0>['user'];
  isLoading: boolean;
  org: OrgDetails | undefined;
  roles: string[];
  nickname: string | undefined;
  email: string | undefined;
  picture: string | undefined;
  name: string | undefined;
}

/**
 * Custom hook to extract user details and custom claims from Auth0
 * Retrieves organization info, roles, and other user data
 */
export const useUserDetails = (): UserDetails => {
  const {user, isLoading} = useAuth0();

  // Extract custom claims from user metadata
  const orgClaimKey = `${config.auth0.claimsNamespace}/org`;
  const rolesClaimKey = `${config.auth0.claimsNamespace}/roles`;

  const org = user?.[orgClaimKey] as OrgDetails | undefined;
  const roles = (user?.[rolesClaimKey] as string[]) || [];

  return {
    user,
    isLoading,
    org,
    roles,
    nickname: user?.nickname,
    email: user?.email,
    picture: user?.picture,
    name: user?.name
  };
};
