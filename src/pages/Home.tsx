import Page from '@/components/Page.tsx';
import { useNavigator } from '@/routes.ts';

function Home() {
  const navigator = useNavigator();

  return (
    <Page title="Check the exercises" className="gap-10">
      <div className="flex gap-6">
        <button onClick={navigator.exerciseOne}>Exercise One</button>
        <button onClick={navigator.exerciseTwo}>Exercise Two</button>
      </div>
    </Page>
  );
}

export default Home;
