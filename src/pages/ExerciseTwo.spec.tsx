import { afterEach, describe, it, mock } from 'bun:test';

import type { Extraction } from '@/exercise2Api';
import ExerciseTwo from '@/pages/ExerciseTwo.tsx';
import { expectSnapshot, render } from '@/utils/test.tsx';

describe('ExerciseTwo Component', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should match the snapshot', async () => {
    const now = Date.now();
    const extractions: Extraction[] = [
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

    mock.module('@/exercise2Api/hooks', () => ({
      useExtractions: () => extractions,
    }));

    const result = await render(<ExerciseTwo />, {
      route: ['/exercise2', '/exercise2'],
    });

    expectSnapshot(result.container).toMatchSnapshot();
  });
});
