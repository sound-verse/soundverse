import React from 'react'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import { AppProvider } from '../context/AppContext'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

import 'tailwindcss/tailwind.css'
import './styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const config = {}
  const apolloClient = useApollo(pageProps)

  return (
    <AppProvider>
      <ApolloProvider client={apolloClient}>
        <DAppProvider config={config}>
          <Component {...pageProps} />
        </DAppProvider>
      </ApolloProvider>
    </AppProvider>
  )
}
export default MyApp
