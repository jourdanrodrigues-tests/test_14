import React, { useMemo } from 'react';

import { Card, Typography } from '@material-tailwind/react';

import Page from '@/components/Page.tsx';
import { Extraction } from '@/exercise2Api';
import { useExtractions } from '@/exercise2Api/queries.ts';
import { useNavigator } from '@/routes.ts';

export default function ExerciseTwo() {
  const navigator = useNavigator();
  const { extractions, isFetching } = useExtractions();

  const columns = useMemo(() => {
    const output: Record<
      Extract<keyof Extraction, 'id' | 'configuration' | 'status'>,
      { key: string; value: React.ReactNode }[]
    > = { id: [], configuration: [], status: [] };

    for (const extraction of extractions) {
      output.id.push({ key: extraction.id, value: extraction.id });
      output.configuration.push({
        key: extraction.id,
        value: extraction.configuration,
      });
      output.status.push({ key: extraction.id, value: extraction.status });
    }
    return output;
  }, [extractions]);

  return (
    <Page
      title="Exercise #2 not done yet"
      className="gap-10 justify-start mt-10"
    >
      <button onClick={navigator.home}>Go back</button>
      {isFetching ? 'Getting more extractions...' : null}
      <Card className="overflow-y-hidden">
        <div className="flex max-h-60 overflow-y-auto">
          <Column title="ID">
            {columns.id.map(({ key, value }) => (
              <Cell key={key}>{value}</Cell>
            ))}
          </Column>
          <Column title="Configuration">
            {columns.configuration.map(({ key, value }) => (
              <Cell key={key}>{value}</Cell>
            ))}
          </Column>
          <Column title="Status">
            {columns.status.map(({ key, value }) => (
              <Cell key={key}>{value}</Cell>
            ))}
          </Column>
        </div>
      </Card>
    </Page>
  );
}

function Column({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="w-full border-b border-blue-gray-100 bg-blue-gray-50 p-4 sticky inset-0">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none opacity-70"
        >
          {title}
        </Typography>
      </div>
      {children}
    </div>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <Typography className="py-3 px-4">{children}</Typography>;
}
