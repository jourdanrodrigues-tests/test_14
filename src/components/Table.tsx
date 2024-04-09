import React from 'react';

import mergeCls from '@/mergeCls.ts';

type Item = { id: string; [key: string]: unknown };

export type Column<T extends Item> = {
  label: string;
} & (
  | { source: keyof T; render?: never }
  | { source?: never; render: (item: T) => React.ReactNode }
);

type Props<T extends Item> = {
  columns: Column<T>[];
  items: T[];
  rowClassName?: (item: T, index: number) => string;
};

export default function Table<T extends Item>({
  columns,
  items,
  rowClassName,
}: Props<T>) {
  return (
    <table className="table-auto relative w-full border">
      <thead>
        <tr className="bg-blue-gray-50 sticky top-0">
          {columns.map(({ label }) => (
            <th key={label} className="px-6 py-3">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y">
        {items.map((item, itemIndex) => {
          const className = rowClassName?.(item, itemIndex);
          return (
            <tr
              key={item.id}
              className={mergeCls('even:bg-blue-gray-50/50', className)}
            >
              {columns.map(({ source, render }, columnIndex) => (
                <td key={`${item.id}-${columnIndex}`} className="py-3 px-4">
                  {source && (item[source] as React.ReactNode)}
                  {render && render(item)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
