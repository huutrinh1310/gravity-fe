import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { PortfolioType, ProfileType } from '../types/ProfileType';

import { getBannerByProfileId, getPortfolioByProfileId, getProfiles } from '../../app/services/profiles.service';
import type { BannerType } from '../types/Banner.type';

type ProfileQueryOptionsProperties = UseQueryOptions<ProfileType, TError>;

export const useProfilesQuery = (queryKey?: string, options?: ProfileQueryOptionsProperties) => {
  const key = `profile-${queryKey ? queryKey : 'default'}`;

  return useQuery({
    queryFn: async () => getProfiles(),
    queryKey: [key],
    ...options,
  });
};

type BannerQueryOptionsProperties = Omit<UseQueryOptions<BannerType, TError>, 'queryFn' | 'queryKey'>;

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
    ...options,
  });
};

type PortfolioQueryOptionsProperties = Omit<UseQueryOptions<PortfolioType[], TError>, 'queryFn' | 'queryKey'>;

export const usePortfolioProfileQuery = (profileId: string, options?: PortfolioQueryOptionsProperties) => {
  const key = `portfolio-profile-${profileId}`;

  return useQuery({
    queryFn: async () => getPortfolioByProfileId(profileId),
    queryKey: [key],
    ...options,
  });
};