import Page from '@/components/Page.tsx';
import Table from '@/components/Table.tsx';
import {
  useEntriesQuery,
  useHighlightIndexes,
} from '@/exercise1Api/queries.ts';
import { useNavigator } from '@/routes.ts';

export default function ExerciseOne() {
  const navigator = useNavigator();
  const { data: { entries, columns } = { entries: [], columns: [] } } =
    useEntriesQuery();
  const highlightIndexes = useHighlightIndexes();

  return (
    <Page title="Exercise #1" className="gap-10 mt-20">
      <div className="flex flex-col gap-6">
        <button onClick={navigator.home}>Go back</button>
        <Table
          items={entries}
          columns={columns}
          rowClassName={(_, index) =>
            highlightIndexes.has(index)
              ? 'dark:bg-yellow-800 bg-yellow-100'
              : ''
          }
        />
      </div>
    </Page>
  );
}
