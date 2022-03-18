import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft, NftOwner, Selling } from '../../common/graphql/schema'
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'
import * as sigUtil from '@metamask/eth-sig-util'

export type BuyProps = {
  owner: NftOwner
  nft: Nft
  selling: Selling
  amountToBuy: number
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useBuy = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()
  const [buyProps, setBuyProps] = useState<BuyProps>(undefined)

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
    console.log(buyProps.owner.user.ethAddress)
    if (!authUser || !chainId) {
      return
    }
    verifySignature()
    try {
      await send(
        authUser.ethAddress,
        buyProps.owner.user.ethAddress,
        buyProps.amountToBuy,
        buyProps.selling.sellingVoucher
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
      SellingVoucher: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'nftContractAddress', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'sellCount', type: 'uint256' },
        { name: 'tokenUri', type: 'string' },
        { name: 'supply', type: 'uint256' },
        { name: 'isMaster', type: 'bool' },
        { name: 'currency', type: 'string' },
      ],
    }

    const address = sigUtil.recoverTypedSignature({
      data: {
        types: sellingVoucherTypes,
        primaryType: 'SellingVoucher',
        domain: {
          name: 'NFTVoucher',
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

    console.log(address.toLowerCase())
    return address.toLowerCase() !==
      buyProps.owner.user.ethAddress.toLowerCase()
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
