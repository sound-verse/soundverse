import React from 'react'
import type { AppProps } from 'next/app'
import {
  DAppProvider,
  FullConfig,
  Localhost,
  Mumbai,
  Polygon,
} from '@usedapp/core'
import { AppProvider } from '../context/AppContext'
import '../css/index.css'
import '../css/pages/marketplace.css'
import { ApolloClientProvider } from '../context/ApolloClientProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const config: Partial<FullConfig> = {
    networks:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? [Localhost] : [Mumbai],
  }

  return (
    <AppProvider>
      <ApolloClientProvider initialApolloState={pageProps.initialApolloState}>
        <DAppProvider config={config}>
          <Component {...pageProps} />
        </DAppProvider>
      </ApolloClientProvider>
    </AppProvider>
  )
}
export default MyApp
