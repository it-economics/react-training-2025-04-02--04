import { FC, PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const withAuthGuard = (component: ReactNode) => (
  <AuthGuard>{component}</AuthGuard>
);
