import React from 'react'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import { AppProvider } from '../context/AppContext'
import 'tailwindcss/tailwind.css'
import './styles.scss'
import { ApolloClientProvider } from '../context/ApolloClientProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const config = {}

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
