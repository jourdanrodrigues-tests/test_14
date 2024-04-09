import Page from '@/components/Page.tsx';
import Table from '@/components/Table.tsx';
import {
  useEntriesQuery,
  useHighlightIndexesQuery,
} from '@/exercise1Api/queries.ts';
import { useNavigator } from '@/routes.ts';

export default function ExerciseOne() {
  const navigator = useNavigator();
  const { data: { entries, columns } = { entries: [], columns: [] } } =
    useEntriesQuery();
  const highlightIndexes = useHighlightIndexesQuery();

  console.log('Refreshed indexes', highlightIndexes);
  return (
    <Page title="Exercise #1" className="gap-10 mt-20">
      <div className="flex flex-col gap-6">
        <button onClick={navigator.home}>Go back</button>
        <Table
          items={entries}
          columns={columns}
          rowClassName={(entry, index) => {
            console.log(entry.fruit, index);
            return highlightIndexes.has(index) ? '!bg-yellow-100' : '';
          }}
        />
      </div>
    </Page>
  );
}
