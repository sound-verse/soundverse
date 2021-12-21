import { useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import { setContext as setApolloContext } from '@apollo/client/link/context'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import Cookies from 'js-cookie'
import { WebSocketLink } from '@apollo/client/link/ws'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'

let apolloClient

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'include',
  })

  let jwtToken
  if (typeof window !== 'undefined') {
    jwtToken = Cookies.get('JWT_TOKEN')
  }

  const authLink = setApolloContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: jwtToken ? `Bearer ${jwtToken}` : 'Bearer bla',
      },
    }
  })

  const error = onError(({ networkError }) => {
    if (networkError) console.log('Error:', networkError)
  })

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT,
        options: {
          reconnect: true,
          timeout: 10000,
          connectionParams: () => ({
            headers: {
              authorization: jwtToken ? `Bearer ${jwtToken}` : '',
            },
          }),
          connectionCallback(err) {
            if (err) {
              console.error(err)
              return
            }
          },
        },
      })
    : null

  const httpwsLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : new BatchHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        batchMax: 5,
      })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, error, httpwsLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nfts: concatPagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
function setContext(
  arg0: (_: any, { headers }: { headers: any }) => { headers: any }
) {
  throw new Error('Function not implemented.')
}
