import axios, { AxiosResponse } from 'axios';

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
  getExtractionsByBatch,
};

export default api;

async function getExtractionsByBatch({
  onBatch,
}: {
  onBatch: (extractions: Extraction[]) => unknown;
}) {
  let nextToken: string | undefined | null = undefined;
  while (nextToken !== null) {
    const params = {
      limit: 10,
      continuation_token: nextToken,
    };
    const response: AxiosResponse<ExtractionResponse> =
      await client.get<ExtractionResponse>('/', { params });
    if (Math.floor(response.status / 100) === 2) {
      onBatch(response.data.data);
      nextToken = response.data.continuation_token;
    }
  }
}
