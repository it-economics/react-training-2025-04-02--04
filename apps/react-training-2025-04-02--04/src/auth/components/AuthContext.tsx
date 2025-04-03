import { createContext, FC, PropsWithChildren, use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invalidateToken, useLogin, useRegister } from '../auth-utils';

interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useLogin(() => setIsLoggedIn(true));
  const register = useRegister();
  const navigate = useNavigate();

  const logout = () => {
    invalidateToken()
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext value={{ login, register, logout, isLoggedIn }}>
      {children}
    </AuthContext>
  );
};

export const useAuthContext = () => use(AuthContext);
