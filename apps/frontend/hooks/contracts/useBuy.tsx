import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, NftOwner, Selling } from '../../common/graphql/schema'
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
  const { state, send } = useContractFunction(contract, 'redeemItem')

  useEffect(() => {
    if (buyProps) {
      executeBuy()
    }
  }, [buyProps])

  useEffect(() => {
    if (state) {
      console.log(state)
    }
  }, [state])

  const executeBuy = async () => {
    if (!authUser || !chainId) {
      return
    }

    try {
      await send(
        authUser.ethAddress,
        buyProps.selling.seller.ethAddress,
        buyProps.amountToBuy,
        buyProps.selling.sellingVoucher,
        {
          value: utils.parseEther(
            calculateServiceFees(
              buyProps.selling.sellingVoucher.price
            ).toString()
          ),
        }
      )
    } catch (error) {
      toast.error('Error buying your NFT!')
    }
  }

  const verifySignature = () => {
    const sellingVoucherTypes = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      SVVoucher: [
        { name: 'nftContractAddress', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'sellCount', type: 'uint256' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'tokenUri', type: 'string' },
        { name: 'supply', type: 'uint256' },
        { name: 'isMaster', type: 'bool' },
        { name: 'currency', type: 'string' },
      ],
    }

    const address = sigUtil.recoverTypedSignature({
      data: {
        types: sellingVoucherTypes,
        primaryType: 'SVVoucher',
        domain: {
          name: 'SVVoucher',
          version: '1',
          chainId: buyProps.nft.chainId,
          verifyingContract: marketContractAddress,
        },
        message: {
          tokenId: buyProps.selling.sellingVoucher.tokenId,
          nftContractAddress:
            buyProps.selling.sellingVoucher.nftContractAddress,
          price: buyProps.selling.sellingVoucher.price,
          sellCount: buyProps.selling.sellingVoucher.sellCount,
          tokenUri: buyProps.selling.sellingVoucher.tokenUri,
          supply: buyProps.selling.sellingVoucher.supply,
          isMaster: buyProps.selling.sellingVoucher.isMaster,
          currency: buyProps.selling.sellingVoucher.currency,
        },
      },
      signature: buyProps.selling.sellingVoucher.signature,
      version: sigUtil.SignTypedDataVersion.V4,
    })

    return address.toLowerCase() !==
      buyProps.selling.seller.ethAddress.toLowerCase()
      ? false
      : true
  }

  const buyNft = async (buyProps: BuyProps) => {
    if (!authUser || !chainId) {
      return
    }

    setBuyProps(buyProps)
  }

  return { buyNft }
}
