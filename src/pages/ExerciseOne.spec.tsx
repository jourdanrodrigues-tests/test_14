import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, it } from 'bun:test';

import exercise1Api from '@/exercise1Api';
import ExerciseOne from '@/pages/ExerciseOne.tsx';
import { expectSnapshot, render } from '@/utils/test.tsx';

const items = [
  { id: 'Apple', fruit: 'Apple', quantity: 10, price: 1.3 },
  { id: 'Banana', fruit: 'Banana', quantity: 20, price: 2.85 },
  { id: 'Cherry', fruit: 'Cherry', quantity: 30, price: 3.12 },
  { id: 'Strawberry', fruit: 'Strawberry', quantity: 40, price: 4.83 },
  { id: 'Blueberry', fruit: 'Blueberry', quantity: 50, price: 5.01 },
  { id: 'Pineapple', fruit: 'Pineapple', quantity: 60, price: 6.45 },
  { id: 'Mango', fruit: 'Mango', quantity: 70, price: 7.62 },
  { id: 'Peach', fruit: 'Peach', quantity: 80, price: 8.15 },
  { id: 'Pear', fruit: 'Pear', quantity: 90, price: 9.81 },
  { id: 'Plum', fruit: 'Plum', quantity: 100, price: 10 },
];

describe('ExerciseOne Component', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(exercise1Api.client);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should match the snapshot', async () => {
    axiosMock
      .onGet('/list')
      .reply(200, [
        ['Fruit', 'Quantity', 'Price'],
        ...items.map(({ fruit, quantity, price }) => [
          fruit,
          quantity,
          `$${price}`,
        ]),
      ])
      .onGet('/highlights')
      .reply(200, [5, 3, 9, 7]);

    const result = await render(<ExerciseOne />, {
      route: ['/exercise1', '/exercise1'],
    });

    await waitFor(() => result.getByText(items[0].fruit)); // Table must be there

    expectSnapshot(result.container).toMatchSnapshot();
  });
});
