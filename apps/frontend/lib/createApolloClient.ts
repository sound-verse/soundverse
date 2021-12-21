import {
  ApolloClient,
  ApolloLink,
  FieldMergeFunction,
  FieldPolicy,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext as setApolloContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import { OperationDefinitionNode } from 'graphql'
import Cookies from 'js-cookie'
import { AuthorizedWsLink } from './authorizedWsLink'
import { customFetch } from './customFetch'
import { BatchHttpLink } from '@apollo/client/link/batch-http'

export interface ApolloClientResponse {
  apolloClient: ApolloClient<Record<string, unknown>>
  authorizedWsLink: AuthorizedWsLink
}

export function createApolloClient(
  // Token should only be passed when SSR, otherwise it will use the cookie
  tokenOverride?: string
): ApolloClientResponse {
  const retryLink = new RetryLink({
    attempts: () => !!process.browser,
  })
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    fetch: customFetch as typeof fetch,
  }) as any

  const errorLink = onError(({ networkError }) => {
    if (networkError) console.log('Network error:', networkError)
  })

  const authLink = setApolloContext((_, { headers }) => {
    const token: string = tokenOverride ?? Cookies.get('JWT_TOKEN')

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const authorizedWsLink = new AuthorizedWsLink(
    () => (tokenOverride ?? Cookies.get('JWT_TOKEN')) as string,
    process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT
  )

  const httpOrWsLink = process.browser
    ? split(
        //only create the split in the browser
        ({ query }) => {
          const { kind, operation } = getMainDefinition(
            query
          ) as OperationDefinitionNode
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        authorizedWsLink.createLink(),
        httpLink
      )
    : new BatchHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        batchMax: 5, // No more than 5 operations per batch
      })

  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, retryLink, errorLink, httpOrWsLink]),
    cache: new InMemoryCache({}),
  })

  return { apolloClient, authorizedWsLink }
}
