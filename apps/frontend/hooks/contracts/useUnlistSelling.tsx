import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, NftType, Selling } from '../../common/graphql/schema.d'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect } from 'react'

export type UnlistSellingProps = {
  selling: Selling
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useUnlistSelling = () => {
  const { authUser } = useAuthContext()
  const { chainId } = useEthers()

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state, send } = useContractFunction(contract as any, 'unlistItem')

  const unlistNft = async (createSellingInputProps: UnlistSellingProps) => {
    if (!authUser || !chainId) {
      return
    }

    const signature =
      createSellingInputProps.selling.mintVoucher?.signature ??
      createSellingInputProps.selling.saleVoucher?.signature

    try {
      await send(signature)
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
    }
  }

  return { unlistNft, unlistNftState: state }
}
