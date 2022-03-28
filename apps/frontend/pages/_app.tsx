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
import NextNProgress from 'nextjs-progressbar'
import { AudioPlayerBar } from '../components/AudioPlayer/AudioPlayerBar'

function MyApp({ Component, pageProps }: AppProps) {
  const supportedNetworks = {
    local: [Localhost, Mumbai],
    testflight: [Mumbai],
  }

  const config: Partial<FullConfig> = {
    networks:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? supportedNetworks.local
        : supportedNetworks.testflight,
    multicallAddresses: {
      31337: '0x6602338AA55E2F65d9DB5644A17AeBD1AA1CdE00',
    },
  }

  return (
    <AuthProvider>
      <ApolloClientProvider initialApolloState={pageProps.initialApolloState}>
        <DAppProvider config={config}>
          <AudioProvider>
            <NextNProgress color="#7A64FF" height={5} />
            <Component {...pageProps} />
            <AudioPlayerBar />
          </AudioProvider>
        </DAppProvider>
      </ApolloClientProvider>
    </AuthProvider>
  )
}
export default MyApp
