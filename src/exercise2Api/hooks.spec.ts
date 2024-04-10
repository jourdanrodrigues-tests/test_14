import { renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';

import { useExtractions } from '@/exercise2Api/hooks.ts';
import exercise2Api, { Extraction } from '@/exercise2Api/index.ts';

const now = Date.now();
const mockExtractions: Extraction[] = [
  {
    id: 'ID_1',
    configuration: 'Configuration 1',
    created: now.toLocaleString(),
    status: 'completed',
  },
  {
    id: 'ID_2',
    configuration: 'Configuration 2',
    created: now.toLocaleString(),
    status: 'pending',
  },
  {
    id: 'ID_3',
    configuration: 'Configuration 3',
    created: now.toLocaleString(),
    status: 'failed',
  },
];

describe('useExtractions', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(exercise2Api.client);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('fetches all extractions', async () => {
    axiosMock
      .onGet('/')
      .replyOnce(200, {
        data: mockExtractions.slice(undefined, 2),
        continuation_token: 'cool_token',
      })
      .onGet('/')
      .replyOnce((config) => {
        expect(config.params.continuation_token).toBe('cool_token');
        return [
          200,
          { data: mockExtractions.slice(2), continuation_token: null },
        ];
      });

    const { result, rerender } = renderHook(() => useExtractions());

    expect(result.current).toEqual([]);

    await waitFor(() => {
      rerender();
      expect(result.current.length).toBeGreaterThan(0);
    });

    expect(result.current).toEqual(mockExtractions);
  });

  it('handles 500 error gracefully', async () => {
    axiosMock
      .onGet('/')
      .replyOnce(500)
      .onGet('/')
      .reply(200, { data: [mockExtractions[0]], continuation_token: null });

    const { result, rerender } = renderHook(useExtractions);

    expect(result.current).toEqual([]);

    await waitFor(
      () => {
        rerender();
        expect(result.current.length).toBeGreaterThan(0);
      },
      { timeout: 5200 }
    );

    expect(result.current).toEqual([mockExtractions[0]]);
  });
});
