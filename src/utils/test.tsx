import React from 'react';

import type { UseQueryResult } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'bun:test';
import pretty from 'pretty';

type TQueryHooks<
  TData = unknown,
  TError = unknown,
  QueryResult = UseQueryResult<TData, TError>,
> = Array<{
  useHook(): QueryResult;
  validate(query: QueryResult): boolean;
}>;

type RenderOptions = {
  queryHooks?: TQueryHooks;
};

export const testQueryClient = new QueryClient();
const queryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);

export async function render(
  node: React.ReactElement,
  options?: RenderOptions
) {
  const hookPromises = (options?.queryHooks || []).map(
    ({ useHook, validate }) => {
      const { result } = renderHook(useHook, { wrapper: queryClientWrapper });
      return waitFor(() => validate(result.current));
    }
  );
  if (hookPromises.length > 0) {
    await Promise.all(hookPromises);
  }

  const result = rtlRender(node, {
    wrapper: ({ children }) => wrapNode(children),
  });
  return result.container;
}

function wrapNode(node: React.ReactNode): React.ReactNode {
  return queryClientWrapper({ children: node });
}

export function expectSnapshot(element: HTMLElement | null) {
  // TODO: Use @testing-library/jest-dom instead of @happy-dom
  //  The JestDOM does some HTML pretty-printing that is better for diffs
  return expect(element && pretty(element.innerHTML));
}
