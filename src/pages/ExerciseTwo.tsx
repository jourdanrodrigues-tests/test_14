import React, { useMemo } from 'react';

import { Card, Typography } from '@material-tailwind/react';

import Page from '@/components/Page.tsx';
import { useExtractions } from '@/exercise2Api/hooks.ts';
import { useNavigator } from '@/routes.ts';
import { capitalize } from '@/utils/string.ts';

export default function ExerciseTwo() {
  const navigator = useNavigator();
  const extractions = useExtractions();
  const { completed, pending, failed } = useMemo(() => {
    const output = { completed: 0, pending: 0, failed: 0 };
    for (const extraction of extractions) {
      output[extraction.status]++;
    }
    return output;
  }, [extractions]);

  return (
    <Page
      title={`Exercise #2 - Fetched ${extractions.length} extractions`}
      className="gap-10 justify-start mt-10"
    >
      <button onClick={navigator.home}>Go back</button>
      <Typography>
        Completed: {completed} | Pending: {pending} | Failed: {failed}
      </Typography>
      <Card className="h-60 overflow-y-auto">
        <table className="table-auto relative w-full border">
          <thead>
            <tr className="bg-blue-gray-50 sticky top-0">
              <Header>ID</Header>
              <Header>Configuration</Header>
              <Header>Date</Header>
              <Header>Status</Header>
            </tr>
          </thead>
          <tbody className="divide-y">
            {extractions.map((extraction) => {
              const hash = extraction.id.split('-')[0]; // For simpler UI
              const createdDate = new Date(extraction.created).toDateString();
              return (
                <tr key={extraction.id}>
                  <Cell typographyClassName="text-sm font-mono">{hash}</Cell>
                  <Cell>{extraction.configuration}</Cell>
                  <Cell>{createdDate}</Cell>
                  <Cell>{capitalize(extraction.status)}</Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-3">{children}</th>;
}

function Cell({
  children,
  typographyClassName,
}: {
  children: React.ReactNode;
  typographyClassName?: string;
}) {
  return (
    <td className="py-3 px-4">
      <Typography className={typographyClassName}>{children}</Typography>
    </td>
  );
}
