import { AxiosError } from 'axios';

const NETWORK_CODES = new Set(['ERR_NETWORK', 'ECONNABORTED']);

export function isOffline(e: unknown) {
  return !!(e instanceof AxiosError && e.code && NETWORK_CODES.has(e.code));
}

export function isServerError(e: unknown): boolean {
  return (
    e instanceof AxiosError && Math.floor((e.response?.status || 0) / 100) === 5
  );
}
