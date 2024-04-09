import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import api from '@/exercise1Api';

const QueryKey = {
  entries: () => ['entries'],
  highlightIndexes: () => ['highlightIds'],
};

export function useEntriesQuery() {
  return useQuery({
    queryKey: QueryKey.entries(),
    queryFn: () => {
      toast('Fetching entries', { type: 'info' });
      return api.getItems();
    },
  });
}

export function useHighlightIndexesQuery() {
  const { data } = useQuery({
    queryKey: QueryKey.highlightIndexes(),
    queryFn: () => api.getHighlightIndexes().then((data) => new Set(data)),
    refetchInterval: 5000,
  });
  return data || new Set();
}
