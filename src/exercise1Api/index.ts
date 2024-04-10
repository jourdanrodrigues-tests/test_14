import axios from 'axios';
import currency from 'currency.js';

import type { Column } from '@/components/Table.tsx';
import { isOffline, isServerError } from '@/utils/axios.ts';

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
  client,
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
        { label: 'Fruit', sortBy: 'fruit', source: 'fruit' },
        { label: 'Quantity', sortBy: 'quantity', source: 'quantity' },
        { label: 'Price', sortBy: 'price', source: 'price' },
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
    if (!isOffline(reason) && !isServerError(reason)) throw reason;
    return withRetryOrRethrow(action);
  });
}
