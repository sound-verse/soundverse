import Link from 'next/link'
import { UnsupportedChainIdError } from '@web3-react/core'
import { useEthers } from '@usedapp/core/'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from './common/Button'
import { formatDiagnosticsWithColorAndContext } from 'typescript'



const WalletButton = () => {
  const { activateBrowserWallet, deactivate, account, library,active,chainId } = useEthers()
  const onError = async (error: Error) => {
    toast(error.message)
  }
  useEffect(() => {
    if(active == true ) {

      if (chainId != 80001) {
        library.provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881',
              chainName: 'Mumbai testnet',
              nativeCurrency: {
                name: 'matic',
                symbol: 'matic',
                decimals: 18,
              },
              rpcUrls: [
                "https://rpc-mumbai.maticvigil.com"
              ],
              blockExplorerUrls: ['https://polygonscan.com/'],
            },
          ],
        })
      }
    } 
  }, [active ])

  return (
    <div>
      <button
        className="hover:bg-purple-700 w-32 h-8 text-white text-xs font-bold border border-white rounded-xl"
        onClick={async () => {
          if (!account) {
          

            await activateBrowserWallet(onError)
          } else {
            await deactivate()
          }
        }}
      >
        {!account ? 'Connect Wallet' : 'Disconnect Wallet'}
      </button>
     
      <p className="text-purple-500">
        Account:{' '}
        {account
          ? account.substring(0, 5) +
            '...' +
            account.substring(account.length - 4, account.length)
          : account}
      </p>
    </div>
  )
}

const Header = () => {
  return (
    <header className="w-full h-20 px-6">
      <div className="mx-auto md:flex justify-between items-center">
        <div className="flex">
          <Link href="/landing" passHref>
            <h1 className="mr-6 mt-5 text-white text-4xl font-bold leading-6 ttitle cursor-pointer">
              SOUNDVERSE
            </h1>
          </Link>

          {/* <Link href="/marketplace" passHref>
            <h3 className="ml-5 mr-5 mt-5 text-white text-sm font-bold leading-6 cursor-pointer">
              Marketplace
            </h3>
          </Link> */}

          {/* <Link href="/" passHref>
            <h3 className="mr-5 mt-5 text-white text-sm font-bold leading-6 cursor-pointer">
              Collections
            </h3>
          </Link> */}
        </div>

        <div className="bg-yellow-200 border-2 border-solid border-yellow-200 bg-opacity-10 relative text-white py-3 px-3 rounded-lg">
          This site is running on testnet!
        </div>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex flex-row items-center space-x-2 mt-3">
            <Link href="/create" passHref>
              <Button type="purple-bg" title="Create" />
            </Link>
            <WalletButton />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          header {
            background: #464447;
          }
          .ttitle {
            color: #d1c4e9;
          }
          .createBtn {
            background: #6200ea;
          }
        `}
      </style>
    </header>
  )
}

export default Header
