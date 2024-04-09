import { useMemo } from 'react';

import { Card, Typography } from '@material-tailwind/react';

import Page from '@/components/Page.tsx';
import Table from '@/components/Table.tsx';
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
        <Table
          items={extractions}
          columns={[
            { label: 'ID', render: (item) => item.id.split('-')[0] },
            { label: 'Configuration', source: 'configuration' },
            {
              label: 'Date',
              render: (item) => new Date(item.created).toDateString(),
            },
            { label: 'Status', render: (item) => capitalize(item.status) },
          ]}
        />
      </Card>
    </Page>
  );
}
