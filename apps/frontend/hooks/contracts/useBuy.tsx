import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, Selling } from '../../common/graphql/schema'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect } from 'react'

export type BuyProps = {
  nft: Nft
  selling: Selling
  amountToBuy: number
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useBuy = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state, send } = useContractFunction(contract, 'redeemItem')

  useEffect(() => {
    console.log(state)
  }, [state])

  const buyNft = async (buyProps: BuyProps) => {
    if (!authUser || !chainId) {
      return
    }

    try {
      await send(
        authUser.ethAddress,
        buyProps.amountToBuy,
        buyProps.selling.sellingVoucher
      )
    } catch (error) {
      toast.error('Error buying your NFT!')
    }
  }

  return { buyNft }
}
