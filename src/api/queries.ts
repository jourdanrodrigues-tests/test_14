import { useQuery } from '@tanstack/react-query';

import api from '@/api/index';

export const QueryKey = {
  extractions: () => ['extractions'],
};

export function useExtractionsQuery() {
  return useQuery({
    queryKey: QueryKey.extractions(),
    queryFn: api.getExtractions,
    refetchInterval: 5000,
  });
}
