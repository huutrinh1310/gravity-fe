import { createContext, useContext, useMemo } from 'react';

export type AuthProperties = {
  name: string;
  avatar?: string;
  email?: string;
  role: string;
};

const initialValue: AuthProperties = {
  name: 'Anymonous',
  role: 'Guest',
};

export const AuthContext = createContext(initialValue);

type AuthProviderProperties = {
  children: React.ReactNode;
  value: AuthProperties;
};

export const AuthProvider = ({ children, value }: AuthProviderProperties) => {
  const authValue = useMemo(() => {
    if (!value) {
      return initialValue;
    }

    return value;
  }, [value]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
