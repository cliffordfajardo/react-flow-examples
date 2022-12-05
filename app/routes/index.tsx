import { useLoaderData } from '@remix-run/react';
import { HomepageLoader } from '~/routes/index';

export default function Index() {
  const loaderData = useLoaderData() as HomepageLoader;
  console.log(`loaderData`, loaderData);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a href="/ReactFlowTest" rel="noreferrer">
            /ReactFlowTest
          </a>
        </li>
        <li>
          <a href="/ReactFlowHoverConnections" rel="noreferrer">
            /ReactFlowHoverConnections
          </a>
        </li>
      </ul>
    </div>
  );
}
