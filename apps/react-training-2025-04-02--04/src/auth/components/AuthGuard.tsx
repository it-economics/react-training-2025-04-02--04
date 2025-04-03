import { FC, PropsWithChildren, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { storeDeepLink } from '../auth-utils';
import { useAuthContext } from './AuthContext';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    storeDeepLink(pathname);
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const withAuthGuard = (component: ReactNode) => (
  <AuthGuard>{component}</AuthGuard>
);
