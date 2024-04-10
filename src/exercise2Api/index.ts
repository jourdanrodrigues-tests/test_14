import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { isServerError } from '@/utils/axios.ts';

type RuntimeToken = string | undefined | null;

export type Extraction = {
  id: string;
  configuration: string;
  created: string;
  status: 'pending' | 'completed' | 'failed';
};

type ExtractionResponse = {
  data: Extraction[];
  continuation_token: Exclude<RuntimeToken, undefined>;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_EXERCISE_2_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  client,
  getExtractionBatch,
};

export default api;

async function getExtractionBatch({
  onBatch,
  batchSize,
}: {
  onBatch: (extractions: Extraction[]) => void;
  batchSize?: number;
}) {
  let nextToken: string | undefined | null = undefined;
  while (nextToken !== null) {
    const params = { limit: batchSize, continuation_token: nextToken };
    try {
      const response: AxiosResponse<ExtractionResponse> =
        await client.get<ExtractionResponse>('/', { params });
      if (Math.floor(response.status / 100) === 2) {
        onBatch(response.data.data);
        nextToken = response.data.continuation_token;
      }
    } catch (e: unknown) {
      if (!isServerError(e)) throw e;
    }
  }
}
