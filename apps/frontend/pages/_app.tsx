import React from 'react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'
import '../css/index.css'
import '../css/pages/marketplace.css'
import { ApolloClientProvider } from '../context/ApolloClientProvider'
import { AudioProvider } from '../context/AudioContext'
import NextNProgress from 'nextjs-progressbar'
import { AudioPlayerBar } from '../components/AudioPlayer/AudioPlayerBar'
import Script from 'next/script'
import { chains, providers } from '@web3modal/ethereum'
import type { ConfigOptions } from '@web3modal/react'
import { Web3Modal } from '@web3modal/react'

function MyApp({ Component, pageProps }: AppProps) {
  if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID)
    throw new Error(
      'You need to provide NEXT_PUBLIC_WC_PROJECT_ID env variable'
    )

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
  let supportedChains = []
  switch (environment) {
    case 'main': {
      supportedChains = [chains.mainnet]
      break
    }
    case 'testflight': {
      supportedChains = [chains.goerli]
      break
    }
    case 'local': {
      supportedChains = [chains.hardhat, chains.localhost]
      break
    }
  }

  const modalConfig: ConfigOptions = {
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
    theme: 'light',
    accentColor: 'blackWhite',
    ethereum: {
      appName: 'Soundverse',
      autoConnect: true,
      chains: supportedChains,
      providers: [
        providers.walletConnectProvider({
          projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
        }) as any,
      ],
    },
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="googleanalytics_">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>

      <AuthProvider>
        <ApolloClientProvider initialApolloState={pageProps.initialApolloState}>
          <AudioProvider>
            <NextNProgress color="#1400FF" height={2} />
            <Web3Modal config={modalConfig} />
            <Component {...pageProps} />
            <AudioPlayerBar />
          </AudioProvider>
        </ApolloClientProvider>
      </AuthProvider>
    </>
  )
}
export default MyApp
