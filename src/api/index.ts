import axios from 'axios';

type RuntimeToken = string | undefined | null;

type Extraction = {
  id: string;
  configuration: string;
  created: string;
  status: 'pending' | 'completed' | 'failed';
};

type Response = {
  data: Extraction[];
  continuation_token: Exclude<RuntimeToken, undefined>;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  getExtractions,
};

export default api;

async function getExtractions() {
  const output: Extraction[] = [];
  let nextToken: string | undefined | null = undefined;
  while (nextToken !== null) {
    const [extractions, token] = await _fetchExtractions({
      limit: 10,
      continuation_token: nextToken,
    });
    output.push(...extractions);
    nextToken = token;
  }
  return output;

  async function _fetchExtractions(params: {
    limit: number;
    continuation_token: string | undefined | null;
  }): Promise<[Extraction[], string | undefined | null]> {
    const { data, status } = await client.get<Response>('/', { params });
    return status % 100 === 2
      ? [data.data, data.continuation_token]
      : [[], params.continuation_token];
  }
}
