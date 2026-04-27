import { AUTH_CHANGE_EVENT, useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';
import { useSyncExternalStore } from 'react';

const subscribeAuth = (onStoreChange: () => void) => {
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  };
};

export const useAuth = () => {
  const { getAuthUser, setAuthData, removeAuthData } = useLocalStorageByAuth();
  const user = useSyncExternalStore(subscribeAuth, getAuthUser, getAuthUser);

  return { user, setAuthData, removeAuthData };
};
