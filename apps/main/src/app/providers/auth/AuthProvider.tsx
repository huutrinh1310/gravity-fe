import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { refreshSession, setAccessToken } from '../../../shared/lib/apiClient';
import { getApiUrl } from '../../../shared/constants/api';


export type AuthState = {
  completeOAuth: (accessToken: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github') => void;
  logout: () => Promise<void>;
  register: (data: { name: string; email: string; password: string; address: string }) => Promise<void>;
  user: AuthUser | null;
};

export type AuthUser = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: string;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: attempt silent refresh (cookie auto-sent)
  useEffect(() => {
    if (globalThis.location.pathname === '/oauth/callback') {
      setIsLoading(false);

      return;
    }

    let active = true;

    refreshSession<AuthUser>()
      .then((session) => {
        if (active) {
          setUser(session.profile);
        }
      })
      .catch(() => {
        if (active) {
          setAccessToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(getApiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data = await res.json();

    setAccessToken(data.accessToken);
    setUser(data.profile);
  }, []);

  const register = useCallback(async (form: { name: string; email: string; password: string; address: string }) => {
    const res = await fetch(getApiUrl('/auth/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error('Registration failed');
    }
    const data = await res.json();

    setAccessToken(data.accessToken);
    setUser(data.profile);
  }, []);

  const loginWithOAuth = useCallback((provider: 'google' | 'github') => {
    globalThis.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}`;
  }, []);

  const completeOAuth = useCallback(async (token: string) => {
    setAccessToken(token);
    try {
      const session = await refreshSession<AuthUser>();

      setUser(session.profile);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(getApiUrl('/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      loginWithOAuth,
      completeOAuth,
      logout,
    }),
    [user, isLoading, login, register, loginWithOAuth, completeOAuth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}
