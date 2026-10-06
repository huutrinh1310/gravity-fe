import { api, getApiUrl } from '../../shared/constants/api';
import { apiClient } from '../../shared/lib/apiClient';
import type { BannerType } from '../../shared/types/Banner.type';
import type { PortfolioType, ProfileType } from '../../shared/types/ProfileType';

export const getProfiles = async () => {
  const url = getApiUrl(api.profile.get);
  const data = await apiClient<ProfileType>(url, {
    method: 'GET',
  });

  return data;
};

export const getBannerByProfileId = async (profileId: string): Promise<BannerType> => {
  const url = getApiUrl(api.banner.getByProfileId(profileId));

  const data = await apiClient<BannerType>(url, {
    method: 'GET',
  });

  return data;
};

export const getPortfolioByProfileId = async (profileId: string): Promise<PortfolioType[]> => {
  const url = getApiUrl(api.portfolio.getByProfileId(profileId));

  const data = await apiClient<PortfolioType[]>(url, {
    method: 'GET',
  });

  return data;
};

export const getPortfolioById = async (portfolioId: string): Promise<PortfolioType> => {
  const url = getApiUrl(api.portfolio.getById(portfolioId));

  const data = await apiClient<PortfolioType>(url, {
    method: 'GET',
  });

  return data;
};

export const getProfileById = async (profileId: string): Promise<ProfileType> => {
  const url = getApiUrl(api.profile.getById(profileId));
  const data = await apiClient<ProfileType>(url, {
    method: 'GET',
  });

  return data;
};
