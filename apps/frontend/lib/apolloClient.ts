import { ApolloClientResponse, createApolloClient } from './createApolloClient';
import deepmerge from 'deepmerge';
import isEqual from 'lodash/isEqual';

let _apolloClientResponse: ApolloClientResponse;

export function initializeApollo({
  token,
  initialState = {},
  force,
}: {
  // Token should only be passed when SSR, otherwise it will use the cookie
  token?: string;
  initialState?: Record<string, unknown>;
  force?: boolean;
}) {
  if (force) {
    _apolloClientResponse = null;
  }

  const apolloClientResponse = _apolloClientResponse ?? createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClientResponse.apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = deepmerge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]): unknown[] => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    apolloClientResponse.apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo apolloClient
  if (!process.browser) return apolloClientResponse;
  // Create the Apollo Client once in the client
  if (!_apolloClientResponse) _apolloClientResponse = apolloClientResponse;
  return apolloClientResponse;
}
