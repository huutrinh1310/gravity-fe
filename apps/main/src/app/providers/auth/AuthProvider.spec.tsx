import { StrictMode } from 'react';

import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { OAuthCallbackPage } from '../../../pages/auth/OAuthCallbackPage';
import { getAccessToken, setAccessToken } from '../../../shared/lib/apiClient';
import { AuthProvider, useAuth } from './AuthProvider';

function AuthProbe() {
  const { completeOAuth, isLoading, logout, user } = useAuth();

  return (
    <>
      <output data-testid="loading">{String(isLoading)}</output>
      <output data-testid="email">{user?.email ?? 'anonymous'}</output>
      <button onClick={() => void completeOAuth('fragment-token')} type="button">
        Complete OAuth
      </button>
      <button onClick={() => void logout()} type="button">
        Logout
      </button>
    </>
  );
}

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('AuthProvider', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    setAccessToken(null);
    globalThis.history.replaceState({}, '', '/');
  });

  it('shares startup refresh across StrictMode effect replay', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, {
      accessToken: 'startup-token',
      profile: { id: 7, name: 'Ada', email: 'ada@example.com', role: 'ROLE_USER' },
    }));

    vi.stubGlobal('fetch', fetchMock);

    render(
      <StrictMode>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </StrictMode>,
    );

    await waitFor(() => expect(screen.getByTestId('email')).toHaveTextContent('ada@example.com'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(getAccessToken()).toBe('startup-token');
  });

  it('restores the OAuth session once and updates the user', async () => {
    globalThis.history.replaceState({}, '', '/oauth/callback');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, {
      accessToken: 'rotated-token',
      profile: { id: 9, name: 'Grace', email: 'grace@example.com', role: 'ROLE_USER' },
    }));

    vi.stubGlobal('fetch', fetchMock);

    render(
      <StrictMode>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </StrictMode>,
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Complete OAuth' }));

    await waitFor(() => expect(screen.getByTestId('email')).toHaveTextContent('grace@example.com'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(getAccessToken()).toBe('rotated-token');
  });

  it('clears local auth state on logout', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(200, {
        accessToken: 'startup-token',
        profile: { id: 7, name: 'Ada', email: 'ada@example.com', role: 'ROLE_USER' },
      }))
      .mockResolvedValueOnce(jsonResponse(204, {}));

    vi.stubGlobal('fetch', fetchMock);

    render(
      <StrictMode>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </StrictMode>,
    );

    await waitFor(() => expect(screen.getByTestId('email')).toHaveTextContent('ada@example.com'));
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    await waitFor(() => expect(screen.getByTestId('email')).toHaveTextContent('anonymous'));
    expect(getAccessToken()).toBeNull();
  });

  it('completes the browser OAuth callback and navigates home', async () => {
    globalThis.history.replaceState({}, '', '/oauth/callback#access_token=fragment-token');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, {
      accessToken: 'rotated-token',
      profile: { id: 9, name: 'Grace', email: 'grace@example.com', role: 'ROLE_USER' },
    }));

    vi.stubGlobal('fetch', fetchMock);

    render(
      <StrictMode>
        <MantineProvider>
          <MemoryRouter initialEntries={['/oauth/callback']}>
            <AuthProvider>
              <Routes>
                <Route element={<OAuthCallbackPage />} path="/oauth/callback" />
                <Route element={<output data-testid="home">Home</output>} path="/" />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        </MantineProvider>
      </StrictMode>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(getAccessToken()).toBe('rotated-token');
    await waitFor(() => expect(screen.getByTestId('home')).toHaveTextContent('Home'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(getAccessToken()).toBe('rotated-token');
  });
});