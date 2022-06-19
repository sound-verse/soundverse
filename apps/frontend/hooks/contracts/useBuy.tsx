import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, NftOwner, Selling } from '../../common/graphql/schema.d'
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'
import * as sigUtil from '@metamask/eth-sig-util'
import { useServiceFees } from './useServiceFees'

export type BuyProps = {
  nft: Nft
  selling: Selling
  amountToBuy: number
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useBuy = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()
  const [buyProps, setBuyProps] = useState<BuyProps>(undefined)
  const { calculateServiceFees } = useServiceFees()

  //TODO: currently just taking the recent marketplace contract address - we should provide fallback for older marketplace contract addresss used in the vouchers

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state: redeemItemState, send: sendRedeemItem } = useContractFunction(
    contract as any,
    'redeemItem'
  )
  const {
    state: redeemItemSecondarySaleState,
    send: sendRedeemItemSecondarySale,
  } = useContractFunction(contract as any, 'redeemItemSecondarySale')

  useEffect(() => {
    if (buyProps) {
      executeBuy()
    }
  }, [buyProps])

  const isMintVoucher = buyProps?.selling?.saleVoucher ? false : true

  const executeBuy = async () => {
    if (!authUser || !chainId) {
      return
    }

    try {
      if (isMintVoucher) {
        await sendRedeemItem(
          authUser.ethAddress,
          buyProps.selling.seller.ethAddress,
          buyProps.amountToBuy,
          buyProps.selling.mintVoucher,
          {
            value: calculateServiceFees(buyProps.selling.mintVoucher.price),
          }
        )
      } else {
        await sendRedeemItemSecondarySale(
          authUser.ethAddress,
          buyProps.selling.seller.ethAddress,
          buyProps.amountToBuy,
          buyProps.selling.saleVoucher,
          {
            value: calculateServiceFees(buyProps.selling.saleVoucher.price),
          }
        )
      }
    } catch (error) {
      toast.error('Error buying your NFT!')
    }
  }

  const buyNft = async (buyProps: BuyProps) => {
    if (!authUser || !chainId) {
      return
    }

    setBuyProps(buyProps)
  }

  return {
    buyNft,
    buyNftState: isMintVoucher ? redeemItemState : redeemItemSecondarySaleState,
  }
}
