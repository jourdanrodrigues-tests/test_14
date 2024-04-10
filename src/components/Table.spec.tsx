import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'bun:test';

import Table from '@/components/Table.tsx';
import { expectSnapshot, render } from '@/utils/test';

describe('Table Component', () => {
  it('should match the snapshot', async () => {
    const user = userEvent.setup();
    const rows = [
      { id: 'ID_1', name: 'Name 1' },
      { id: 'ID_3', name: 'Name 3' }, // Purposefully out of order
      { id: 'ID_2', name: 'Name 2' },
    ];

    const result = await render(
      <Table
        columns={[
          { label: 'ID', sortBy: 'id', source: 'id' },
          { label: 'Row', source: 'name' },
        ]}
        rowClassName={(_, index) => (index === 1 ? 'custom-row-class' : '')}
        items={rows}
      />
    );

    expectSnapshot(result.container).toMatchSnapshot('unfiltered');
    await user.click(screen.getByText('▲'));
    expectSnapshot(result.container).toMatchSnapshot('ascending');
    await user.click(screen.getByText('▼'));
    expectSnapshot(result.container).toMatchSnapshot('descending');
    await user.click(screen.getByText('▼'));
    expectSnapshot(result.container).toMatchSnapshot('back to unfiltered');
  });
});
