import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import crypto from 'crypto'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import {
  Nft,
  SellingVoucherInput,
  MutationCreateSellingArgs,
  CreateSellingInput,
  Selling,
} from '../../common/graphql/schema'
import { NftType } from '../../common/types/nft-type.enum'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect } from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

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

    // const walletAddress = '0xbda5747bfd65f08deb54cb465eb87d40e51b197e'
    // const privateKey =
    //   '0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd'

    // const web3 = new Web3('http://localhost:8545')
    // const contract = new web3.eth.Contract(
    //   MarketContractAbi.abi as AbiItem[],
    //   marketContractAddress
    // )

    // const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest') //get latest nonce
    // const rnd = Math.ceil(Math.random() * 451811354)
    // const tx = {
    //   from: walletAddress,
    //   to: marketContractAddress,
    //   nonce: nonce,
    //   gas: 500000,
    //   maxPriorityFeePerGas: 1999999987,
    //   //to, id, minturi, amount, data
    //   data: contract.methods
    //     .redeemItem(
    //       authUser.ethAddress,
    //       buyProps.amountToBuy,
    //       buyProps.selling.sellingVoucher
    //     )
    //     .encodeABI(),
    // }

    // const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)
    // const transactionReceipt = await web3.eth.sendSignedTransaction(
    //   signedTx.rawTransaction
    // )

    // console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`)

    console.log({
      _buyer: authUser.ethAddress,
      _amountToPurchase: buyProps.amountToBuy,
      _mintVoucher: buyProps.selling.sellingVoucher,
    })
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
