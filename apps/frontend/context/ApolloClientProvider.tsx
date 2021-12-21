import { ApolloProvider } from '@apollo/client'
import React, { FC } from 'react'
import { useApollo } from '../hooks/useApollo'

interface Props {
  initialApolloState?: Record<string, unknown>
}

export const ApolloClientProvider: FC<Props> = ({
  initialApolloState,
  children,
}) => {
  const apolloClient = useApollo(initialApolloState)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
