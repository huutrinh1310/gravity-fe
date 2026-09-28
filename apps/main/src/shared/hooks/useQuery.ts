import { type UseQueryOptions, useQuery as useReactQuery } from '@tanstack/react-query';

export const useQuery = <TData, TError>(
  queryKey: readonly unknown[] | string,
  queryFunction: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>,
) =>
  useReactQuery({
    queryFn: queryFunction,
    queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
    ...options,
  });
