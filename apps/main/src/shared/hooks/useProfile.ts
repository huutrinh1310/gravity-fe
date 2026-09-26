import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ProfileType } from "../types/ProfileType";
import { api, getApiUrl } from "../constants/api";

export const useProfileQuery = (
  queryKey?: string,
  options?: UseQueryOptions<ProfileType, TError>,
) => {
  const key = `profile-${queryKey ? queryKey : "default"}`;
  const url = getApiUrl(api.profile.get);

  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data: ProfileType = await response.json();

      return data;
    },
    ...options,
  });
};
