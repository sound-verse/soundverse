import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, NftOwner, Selling } from '../../common/graphql/schema.d'
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'
import { useLogin } from '../useLogin'
import Web3 from 'web3'

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
  const { logout } = useLogin()

  //TODO: currently just taking the recent marketplace contract address - we should provide fallback for older marketplace contract addresss used in the vouchers

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state: redeemMintVoucherState, send: sendRedeemMintVoucher } =
    useContractFunction(contract as any, 'redeemMintVoucher')
  const { state: redeemSaleVoucherState, send: sendRedeemSaleVoucher } =
    useContractFunction(contract as any, 'redeemSaleVoucher')

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

    if (isMintVoucher) {
      await sendRedeemMintVoucher(
        buyProps.amountToBuy,
        buyProps.selling.mintVoucher,
        {
          value: buyProps.selling.mintVoucher.price,
        }
      )
    } else {
      await sendRedeemSaleVoucher(
        buyProps.amountToBuy,
        buyProps.selling.saleVoucher,
        {
          value: buyProps.selling.mintVoucher.price,
        }
      )
    }
  }

  const buyNft = async (buyProps: BuyProps) => {
    if (!authUser || !chainId) {
      toast.error('Please reconnect your wallet.')
      logout()
      return
    }

    setBuyProps(buyProps)
  }

  return {
    buyNft,
    buyNftState: isMintVoucher
      ? redeemMintVoucherState
      : redeemSaleVoucherState,
  }
}
