import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import type { Extraction } from '@/exercise2Api';
import api from '@/exercise2Api';
import { isOffline } from '@/utils/axios.ts';

export function useExtractions() {
  const [lookup, setLookup] = useState<Record<string, Extraction>>({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    let rendered = true;
    const toastId = toast('Getting more extractions', { type: 'info' });
    api
      .getExtractionsByBatch({ onBatch })
      .catch((e) => {
        if (!rendered || !isOffline(e)) return;
        toast.update(toastId, {
          type: 'error',
          render: 'Could not reach server. Next attempt will happen shortly.',
        });
      })
      .finally(() => {
        if (!rendered) return;
        setTimeout(() => {
          if (!rendered) return;
          setFlag((prevFlag) => !prevFlag); // Provoking an infinite loop
        }, 5 * 1000);
      });

    return () => {
      rendered = false;
    };

    function onBatch(newExtractions: Extraction[]) {
      if (!rendered) return;
      const data = {} as Record<string, Extraction>;
      for (const extraction of newExtractions) {
        data[extraction.id] = extraction;
      }
      setLookup((prevState) => ({ ...prevState, ...data }));
    }
  }, [flag]);

  return Object.values(lookup).sort((a, b) =>
    b.created.localeCompare(a.created)
  );
}
