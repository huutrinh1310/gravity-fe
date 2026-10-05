let accessToken: string | null = null;

type RefreshSession = { accessToken: string; profile: unknown };
let refreshPromise: Promise<RefreshSession> | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function refreshSession<TProfile = unknown>(): Promise<{ accessToken: string; profile: TProfile }> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        { method: 'POST', credentials: 'include' }
      );

      if (!res.ok) {
        throw new Error('Session expired');
      }

      const data: { accessToken?: unknown; profile?: unknown } = await res.json();

      if (typeof data.accessToken !== 'string' || data.accessToken.length === 0
        || data.profile === null || typeof data.profile !== 'object') {
        throw new Error('Session expired');
      }

      const session = { accessToken: data.accessToken, profile: data.profile };

      setAccessToken(session.accessToken);

      return session;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise as Promise<{ accessToken: string; profile: TProfile }>;
}

export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  const send = (token: string | null) => {
    const headers = new Headers(options.headers);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, { ...options, headers, credentials: 'include' });
  };

  const tokenUsed = accessToken;
  let response = await send(tokenUsed);

  if (response.status === 401) {
    try {
      let newToken = accessToken;

      if (!newToken || newToken === tokenUsed) {
        const session = await refreshSession();

        newToken = session.accessToken;
      }

      response = await send(newToken);
    } catch {
      setAccessToken(null);
      globalThis.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  if (response.status === 401) {
    setAccessToken(null);
    globalThis.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
