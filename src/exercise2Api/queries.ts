import { useEffect, useState } from 'react';

import type { Extraction } from '@/exercise2Api';
import api from '@/exercise2Api';

export function useExtractions() {
  const [lookup, setLookup] = useState<Record<string, Extraction>>({});
  const [flag, setFlag] = useState(true);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    api
      .getExtractionsByBatch({ onBatch })
      .then(() => {
        setTimeout(() => setFlag((prevFlag) => !prevFlag), 5 * 1000);
      })
      .finally(() => setFetching(false));

    function onBatch(extractions: Extraction[]) {
      const data = extractions.reduce(
        (output, extraction) => ({ ...output, [extraction.id]: extraction }),
        {} as Record<string, Extraction>
      );
      setLookup((prevState) => ({ ...prevState, ...data }));
    }
  }, [flag]);

  const extractions = Object.values(lookup).sort((a, b) =>
    b.created.localeCompare(a.created)
  );
  return { extractions, isFetching };
}
