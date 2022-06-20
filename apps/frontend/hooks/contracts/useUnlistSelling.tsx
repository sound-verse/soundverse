import { useContractFunction, useEthers } from '@usedapp/core'
import toast from 'react-hot-toast'
import { Nft, NftType, Selling } from '../../common/graphql/schema.d'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'

export type UnlistSellingProps = {
  selling: Selling
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useUnlistSelling = () => {
  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)
  const [unlistProps, setUnlistProps] = useState<UnlistSellingProps>(undefined)

  const { state: unlistMintVoucherState, send: sendUnlistMintVoucher } =
    useContractFunction(contract as any, 'unlistMintVoucher')
  const { state: unlistSaleVoucherState, send: sendUnlistSaleVoucher } =
    useContractFunction(contract as any, 'unlistSaleVoucher')

  useEffect(() => {
    if (unlistProps) {
      executeUnlistNft()
    }
  }, [unlistProps])

  const unlistNft = (unlistProps: UnlistSellingProps) => {
    setUnlistProps(unlistProps)
  }

  const isMintVoucher = unlistProps?.selling?.mintVoucher ? true : false

  const executeUnlistNft = async () => {
    try {
      if (isMintVoucher) {
        await sendUnlistMintVoucher(unlistProps.selling.mintVoucher)
      } else {
        await sendUnlistSaleVoucher(unlistProps.selling.saleVoucher)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error unlisting your NFT!')
    }
  }

  return {
    unlistNft,
    unlistNftState: isMintVoucher
      ? unlistMintVoucherState
      : unlistSaleVoucherState,
  }
}
