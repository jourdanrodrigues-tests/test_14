import React, { useMemo, useState } from 'react';

import { Typography } from '@material-tailwind/react';

import mergeCls from '@/mergeCls.ts';

type Item = { id: string; [key: string]: unknown };

export type Column<T extends Item> = {
  label: string;
  sortBy?: keyof T;
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
  const [sorting, setSorting] = useState<string | null>(null);

  const sortedItems = useMemo(() => {
    return !sorting
      ? items
      : [...items].sort((a, b) => {
          const descending = sorting.startsWith('-');
          const column = descending ? sorting.slice(1) : sorting;
          const [{ [column]: first }, { [column]: second }] = descending
            ? [b, a]
            : [a, b];
          if (typeof first === 'number' && typeof second === 'number') {
            return first - second;
          }
          return String(first).localeCompare(String(second));
        });
  }, [sorting, items]);

  return (
    <table className="table-auto relative w-full border">
      <thead>
        <tr className="bg-blue-gray-50 sticky top-0">
          {columns.map(({ label, sortBy }) => {
            const sortAscValue = String(sortBy);
            const sortDescValue = `-${String(sortBy)}`;
            return (
              <th key={label} className="px-6 py-3">
                <div className="flex gap-4">
                  <Typography>{label}</Typography>
                  {sortBy && (
                    <div className="flex flex-col">
                      <SortingButton
                        value={sortAscValue}
                        active={sorting === sortAscValue}
                        onClick={setSorting}
                      >
                        ▲
                      </SortingButton>
                      <SortingButton
                        value={sortDescValue}
                        active={sorting === sortDescValue}
                        onClick={setSorting}
                      >
                        ▼
                      </SortingButton>
                    </div>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="divide-y">
        {sortedItems.map((item, itemIndex) => {
          const className = rowClassName?.(item, itemIndex);
          return (
            <tr
              key={item.id}
              className={mergeCls('even:bg-blue-gray-50/50', className)}
            >
              {columns.map(({ source, render }, columnIndex) => (
                <td key={`${item.id}-${columnIndex}`} className="py-3 px-4">
                  {render ? render(item) : (item[source] as React.ReactNode)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function SortingButton({
  onClick,
  active,
  value,
  children,
}: {
  onClick: React.Dispatch<React.SetStateAction<string | null>>;
  active: boolean;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Typography
      className={mergeCls(
        'text-xs leading-none cursor-pointer select-none',
        active && 'text-yellow-700 dark:text-black'
      )}
      onClick={() => {
        onClick((prevState) => (prevState === value ? null : value));
      }}
    >
      {children}
    </Typography>
  );
}
