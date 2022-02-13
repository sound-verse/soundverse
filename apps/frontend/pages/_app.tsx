import React from 'react'
import type { AppProps } from 'next/app'
import {
  DAppProvider,
  FullConfig,
  Localhost,
  Mumbai,
  Polygon,
} from '@usedapp/core'
import { AuthProvider } from '../context/AuthContext'
import '../css/index.css'
import '../css/pages/marketplace.css'
import { ApolloClientProvider } from '../context/ApolloClientProvider'
import { AudioProvider } from '../context/AudioContext'

function MyApp({ Component, pageProps }: AppProps) {
  const config: Partial<FullConfig> = {
    networks:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? [Localhost] : [Mumbai],
  }

  return (
    <AuthProvider>
      <ApolloClientProvider initialApolloState={pageProps.initialApolloState}>
        <DAppProvider config={config}>
          <AudioProvider>
            <Component {...pageProps} />
          </AudioProvider>
        </DAppProvider>
      </ApolloClientProvider>
    </AuthProvider>
  )
}
export default MyApp
