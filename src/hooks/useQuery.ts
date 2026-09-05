import { useQuery as useReactQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useQuery = <TData, TError>(
  queryKey: string | readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>,
) =>
  useReactQuery({
    queryKey: typeof queryKey === "string" ? [queryKey] : queryKey,
    queryFn,
    ...options,
  });
