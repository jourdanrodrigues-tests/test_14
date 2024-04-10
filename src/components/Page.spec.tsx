import { describe, it } from 'bun:test';

import Page from '@/components/Page.tsx';
import { expectSnapshot, render } from '@/utils/test';

describe('Page Component', () => {
  it('should match the snapshot', async () => {
    const result = await render(
      <Page className="custom-page-class" title="Page title">
        <span>Page content</span>
      </Page>
    );

    expectSnapshot(result.container).toMatchSnapshot();
  });
});
