import axios, { AxiosError } from 'axios';
import currency from 'currency.js';

import type { Column } from '@/components/Table.tsx';

export type ServerEntry = [string, string, string];

type EntryResponse = [ServerEntry, ...ServerEntry[]];

export type Entry = {
  id: string;
  fruit: string;
  quantity: number;
  price: number;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_EXERCISE_1_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  getItems() {
    const _request = () => client.get<EntryResponse>('/list');

    return withRetryOrRethrow(_request).then(({ data }) => {
      const entries = data.slice(1).map(
        ([fruit, quantity, price]): Entry => ({
          id: fruit,
          fruit,
          quantity: +quantity,
          price: currency(price).value,
        })
      );
      const columns: Column<Entry>[] = [
        { label: 'Fruit', source: 'fruit' },
        { label: 'Quantity', source: 'quantity' },
        { label: 'Price', source: 'price' },
      ];

      return { entries, columns };
    });
  },
  getHighlightIndexes() {
    const _request = () =>
      client.get<[number, number]>('/highlights').then(({ data }) => data);
    return withRetryOrRethrow(_request);
  },
};

export default api;

function withRetryOrRethrow<T = unknown>(action: () => Promise<T>): Promise<T> {
  return action().catch((reason: Error) => {
    const shouldRetry =
      reason instanceof AxiosError &&
      (reason.code === 'ERR_NETWORK' ||
        Math.floor((reason.response?.status || 0) / 100)) === 5;
    if (shouldRetry) return withRetryOrRethrow(action);
    throw reason;
  });
}