import React from 'react';

type Props = {
  header: [string, React.ReactNode][];
  rows: [string, React.ReactNode[]][];
};

export default function Table({ header, rows }: Props) {
  console.log(rows);
  return (
    <table className="table-auto relative w-full border">
      <thead>
        <tr className="bg-blue-gray-50 sticky top-0">
          {header.map(([key, head]) => (
            <th key={key} className="px-6 py-3">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y">
        {rows.map(([key, row]) => (
          <tr key={key}>
            {row.map((cell, index) => (
              <td key={`${key}-${index}`} className="py-3 px-4">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
