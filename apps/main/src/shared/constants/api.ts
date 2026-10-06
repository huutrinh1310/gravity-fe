export const api = {
  profile: {
    get: '/profiles',
    update: '/profiles',
    getById: (profileId: string) => `/profiles/${profileId}`,
  },
  projects: '/projects',
  banner: {
    get: '/banners',
    update: '/banners',
    getByProfileId: (profileId: string) => `/banners/profile/${profileId}`,
  },
  portfolio: {
    get: '/portfolios',
    update: '/portfolios',
    getById: (profileId: string) => `/portfolios/${profileId}`,
    getByProfileId: (profileId: string) => `/portfolios/profile/${profileId}`,
  }
};

export const getApiUrl = (path: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

  return `${baseUrl}${path}`;
};

export const putApiUrl = <T extends Record<string, unknown>>(path: string, data: T) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const listKeys = Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] as string)}`);

  if (listKeys.length > 0) {
    return `${baseUrl}${path}?${listKeys.join('&')}`;
  }

  return `${baseUrl}${path}`;
};
