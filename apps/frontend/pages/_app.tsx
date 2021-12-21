import type { AppProps } from 'next/app'
import {DAppProvider} from '@usedapp/core'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../services/apolloClient'

import 'tailwindcss/tailwind.css'
import './styles.css'

import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_TESTNET_HTTPS_URI,
} from '../constants/mintbase'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    ...pageProps,
    network: {
      graphUri:
        process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK === 'testnet'
          ? GRAPH_TESTNET_HTTPS_URI
          : GRAPH_MAINNET_HTTPS_URI,
    },
  })
  const config = {
  }

  return (
      <ApolloProvider client={apolloClient}>
        <DAppProvider config = {config}>
        <Component {...pageProps} />
        </DAppProvider>
      </ApolloProvider>
  )
}
export default MyApp