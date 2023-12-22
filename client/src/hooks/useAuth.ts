import { useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';

export const useAuth = () => {
  const { getAuthUser, setAuthData, removeAuthData } = useLocalStorageByAuth();

  return { user: getAuthUser(), setAuthData, removeAuthData };
};
