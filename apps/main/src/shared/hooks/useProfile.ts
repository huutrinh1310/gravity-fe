import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { PortfolioType, ProfileType } from '../types/ProfileType';

import { getBannerByProfileId, getPortfolioById, getPortfolioByProfileId, getProfileById, getProfiles } from '../../app/services/profiles.service';
import type { BannerType } from '../types/Banner.type';

type QueryOptions<T> =  Omit<UseQueryOptions<T, TError>, 'queryFn' | 'queryKey' | 'refetchOnWindowFocus'>

type ProfileQueryOptionsProperties = QueryOptions<ProfileType>;

export const useProfilesQuery = (queryKey?: string, options?: ProfileQueryOptionsProperties) => {
  const key = `profile-${queryKey ? queryKey : 'default'}`;

  return useQuery({
    queryFn: async () => getProfiles(),
    queryKey: [key],
    refetchOnWindowFocus: false,
    ...options,
  });
};

type BannerQueryOptionsProperties = QueryOptions<BannerType>;

/**
 * Fetch banners for a specific profile using the provided profileId.
 * @param profileId
 * @param options
 * @returns Banners
 */
export const useBannerProfileQuery = (profileId: string, options?: BannerQueryOptionsProperties) => {
  const key = `banner-profile-${profileId}`;

  return useQuery({
    queryFn: async () => getBannerByProfileId(profileId),
    queryKey: [key],
    refetchOnWindowFocus: false,
    ...options,
  });
};

type PortfolioQueryOptionsProperties = QueryOptions<PortfolioType[]>;

/**
 *
 * @param profileId
 * @param options
 * @returns Portfolio by profileId
 */
export const usePortfolioProfileQuery = (profileId: string, options?: PortfolioQueryOptionsProperties) => {
  const key = `portfolio-profile-${profileId}`;

  return useQuery({
    queryFn: async () => getPortfolioByProfileId(profileId),
    queryKey: [key],
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useProfileQuery = (profileId: string, options?: ProfileQueryOptionsProperties) => {
  const key = `profile-${profileId}`;

  return useQuery({
    queryFn: async () => getProfileById(profileId),
    queryKey: [key],
    refetchOnWindowFocus: false,
    ...options,
  });
};

type PortfolioTypeQueryOptionsProperties = QueryOptions<PortfolioType>;

export const usePortfolioByIdQuery = (portfolioId: string, options?: PortfolioTypeQueryOptionsProperties) => {
    const key = `portfolio-${portfolioId}`;

  return useQuery({
    queryFn: async () => getPortfolioById(portfolioId),
    queryKey: [key],
    refetchOnWindowFocus: false,
    ...options,
  });
}