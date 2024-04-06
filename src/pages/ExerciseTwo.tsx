import Page from '@/components/Page.tsx';
import { useNavigator } from '@/routes.ts';

export default function ExerciseTwo() {
  const navigator = useNavigator();

  return (
    <Page title="Exercise #2 not done yet" className="gap-10">
      <div className="flex gap-6">
        <button onClick={navigator.home}>Go back</button>
      </div>
    </Page>
  );
}
