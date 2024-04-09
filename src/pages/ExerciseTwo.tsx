import React, { useMemo } from 'react';

import { Card, Typography } from '@material-tailwind/react';

import Page from '@/components/Page.tsx';
import Table from '@/components/Table.tsx';
import { useExtractions } from '@/exercise2Api/hooks.ts';
import { useNavigator } from '@/routes.ts';
import { capitalize } from '@/utils/string.ts';

const HEADER: [string, React.ReactNode][] = [
  ['id', 'ID'],
  ['configuration', 'Configuration'],
  ['date', 'Date'],
  ['status', 'Status'],
];

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

  const rows = useMemo(() => {
    return extractions.map((extraction): [string, React.ReactNode[]] => {
      const hash = extraction.id.split('-')[0]; // For simpler UI
      const createdDate = new Date(extraction.created).toDateString();
      const row = [
        <Typography className="text-sm font-mono">{hash}</Typography>,
        <Typography>{extraction.configuration}</Typography>,
        <Typography>{createdDate}</Typography>,
        <Typography>{capitalize(extraction.status)}</Typography>,
      ];
      return [extraction.id, row];
    });
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
        <Table header={HEADER} rows={rows} />
      </Card>
    </Page>
  );
}
