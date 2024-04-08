import Page from '@/components/Page.tsx';
import { useNavigator } from '@/routes.ts';

export default function ExerciseOne() {
  const navigator = useNavigator();

  return (
    <Page title="Exercise #1 not done yet" className="gap-10 mt-20">
      <div className="flex gap-6">
        <button onClick={navigator.home}>Go back</button>
      </div>
    </Page>
  );
}
