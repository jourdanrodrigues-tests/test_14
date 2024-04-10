import { describe, expect, it } from 'bun:test';

import { capitalize } from '@/utils/string.ts';

describe('"capitalize" utility', () => {
  const testCases = [
    ['cool string', 'Cool string'],
    ['cool String', 'Cool String'],
    ['Cool string', 'Cool string'],
    ['Cool String', 'Cool String'],
  ];

  it.each(testCases)('should convert %p into %p', (input, expected) => {
    expect(capitalize(input)).toBe(expected);
  });
});
