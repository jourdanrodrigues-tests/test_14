import React from 'react';

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
};

export default function Table<T extends Item>({ columns, items }: Props<T>) {
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
        {items.map((item) => (
          <tr key={item.id} className="even:bg-blue-gray-50/50">
            {columns.map(({ source, render }, index) => (
              <td key={`${item.id}-${index}`} className="py-3 px-4">
                {source && (item[source] as React.ReactNode)}
                {render && render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
