import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.ts';
import { useRefreshMutation } from '@services/user.service.ts';
import { useEffect, useState } from 'react';
import { UserDto } from '@models/User.ts';
import { useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';

let bootstrapRefreshRequest: Promise<UserDto | null> | null = null;

const runBootstrapRefresh = async (
  refresh: ReturnType<typeof useRefreshMutation>[0]
) => {
  if (!bootstrapRefreshRequest) {
    bootstrapRefreshRequest = refresh()
      .unwrap()
      .then((data) => data)
      .catch(() => null)
      .finally(() => {
        bootstrapRefreshRequest = null;
      });
  }
  return bootstrapRefreshRequest;
};

export const PrivateRoutes = () => {
  const { user, setAuthData, removeAuthData } = useAuth();
  const [refresh] = useRefreshMutation();
  const { getCsrfToken } = useLocalStorageByAuth();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        if (isMounted) {
          removeAuthData();
          setIsCheckingSession(false);
        }
        return;
      }

      const data = await runBootstrapRefresh(refresh);
      if (!data) {
        if (isMounted) {
          removeAuthData();
        }
      } else if (isMounted) {
        setAuthData(data);
      }
      if (isMounted) {
        setIsCheckingSession(false);
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isCheckingSession) {
    return null;
  }

  return user?.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace />;
};
