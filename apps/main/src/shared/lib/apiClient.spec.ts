import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiClient, getAccessToken, setAccessToken } from './apiClient';

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('apiClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    setAccessToken(null);
  });

  it('attaches the in-memory token and includes credentials', async () => {
    setAccessToken('memory-token');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, { ok: true }));

    vi.stubGlobal('fetch', fetchMock);

    await apiClient<{ ok: boolean }>('/api/profile');

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;

    expect(new Headers(request.headers).get('Authorization')).toBe('Bearer memory-token');
    expect(request.credentials).toBe('include');
  });

  it('uses one refresh request for concurrent unauthorized requests', async () => {
    setAccessToken('expired-token');
    let refreshCalls = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes('/auth/refresh')) {
        refreshCalls += 1;

        return jsonResponse(200, {
          accessToken: 'fresh-token',
          profile: { id: 7, name: 'Ada', email: 'ada@example.com', role: 'ROLE_USER' },
        });
      }

      const authorization = new Headers(init?.headers).get('Authorization');

      return authorization === 'Bearer expired-token'
        ? jsonResponse(401, {})
        : jsonResponse(200, { authorization });
    });

    vi.stubGlobal('fetch', fetchMock);

    const results = await Promise.all([
      apiClient<{ authorization: string }>('/api/a'),
      apiClient<{ authorization: string }>('/api/b'),
      apiClient<{ authorization: string }>('/api/c'),
    ]);

    expect(refreshCalls).toBe(1);
    expect(getAccessToken()).toBe('fresh-token');
    expect(results.every((result) => result.authorization === 'Bearer fresh-token')).toBe(true);
  });

  it('clears the in-memory token when refresh fails', async () => {
    setAccessToken('expired-token');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(401, {}));

    vi.stubGlobal('fetch', fetchMock);

    await expect(apiClient('/api/private')).rejects.toThrow('Session expired');

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(getAccessToken()).toBeNull();
  });
});