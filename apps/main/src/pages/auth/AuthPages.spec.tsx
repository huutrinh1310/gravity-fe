import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AuthProvider } from '../../app/providers/auth/AuthProvider';
import { getAccessToken, setAccessToken } from '../../shared/lib/apiClient';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function renderPage(page: React.ReactNode) {
  return render(
    <MantineProvider>
      <MemoryRouter>
        <AuthProvider>{page}</AuthProvider>
      </MemoryRouter>
    </MantineProvider>,
  );
}

describe('authentication pages', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    setAccessToken(null);
    globalThis.history.replaceState({}, '', '/');
  });

  it('submits login credentials and stores the access token in memory', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(401, {}))
      .mockResolvedValueOnce(jsonResponse(200, {
        accessToken: 'login-token',
        profile: { id: 7, name: 'Ada', email: 'ada@example.com', role: 'ROLE_USER' },
      }));

    vi.stubGlobal('fetch', fetchMock);
    renderPage(<LoginPage />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => expect(getAccessToken()).toBe('login-token'));
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain('/auth/login');
  });

  it('submits registration details and stores the access token in memory', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(401, {}))
      .mockResolvedValueOnce(jsonResponse(201, {
        accessToken: 'register-token',
        profile: { id: 8, name: 'Grace', email: 'grace@example.com', role: 'ROLE_USER' },
      }));

    vi.stubGlobal('fetch', fetchMock);
    renderPage(<RegisterPage />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Grace' } });
    fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'grace@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your address'), { target: { value: 'London' } });
    fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(getAccessToken()).toBe('register-token'));
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain('/auth/register');
  });
});