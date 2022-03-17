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
} from '../../common/graphql/schema'
import { NftType } from '../../common/types/nft-type.enum'
import { CREATE_SELLING } from '../../common/graphql/mutations/create-selling.mutation'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect } from 'react'

export const sellingVoucherTypes = {
  SellingVoucher: [
    { name: 'tokenId', type: 'uint256' },
    { name: 'nftContractAddress', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'sellCount', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'supply', type: 'uint256' },
    { name: 'isMaster', type: 'bool' },
  ],
}

export type CreateSellingInputProps = {
  price: number
  amount: number
  nftType: NftType
}

const masterContractAddress = process.env.NEXT_PUBLIC_MASTER_CONTRACT_ADDRESS
const licenseContractAddress = process.env.NEXT_PUBLIC_LICENSE_CONTRACT_ADDRESS
const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useCreateSelling = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()
  const [createSellingMutation] =
    useMutation<MutationCreateSellingArgs>(CREATE_SELLING)

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state, send } = useContractFunction(contract, 'getSellCount')

  useEffect(() => {
    console.log(state)
  }, [state])

  const createSelling = async (
    createSellingInputProps: CreateSellingInputProps,
    nft: Nft
  ) => {
    if (!authUser || !chainId) {
      return
    }

    const contractAddress =
      createSellingInputProps.nftType === NftType.MASTER
        ? masterContractAddress
        : licenseContractAddress

    let sellCount = undefined
    try {
      sellCount = await send(
        authUser.ethAddress,
        contractAddress,
        nft.tokenId ? nft.tokenId : 0
      )
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
      return
    }

    console.log(sellCount)

    const voucher = {
      tokenId: nft.tokenId ? nft.tokenId : 0,
      nftContractAddress: await library._getAddress(contractAddress),
      price: createSellingInputProps.price,
      sellCount: 0,
      tokenUri:
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
          ? `http://ipfs.local/${crypto.randomBytes(16).toString('hex')}` //random string for localhost
          : nft.ipfsUrl,
      supply: createSellingInputProps.amount,
      isMaster:
        createSellingInputProps.nftType === NftType.MASTER ? true : false,
    }

    const signingDomain = {
      name: 'SV-Voucher',
      version: '1',
      verifyingContract: marketContractAddress,
      chainId,
    }

    const signature = await library
      .getSigner()
      ._signTypedData(signingDomain, sellingVoucherTypes, voucher)

    const signedVoucher: SellingVoucherInput = {
      ...voucher,
      signature,
    }

    const createSellingInput: CreateSellingInput = {
      nftId: nft.id,
      sellingVoucher: {
        ...signedVoucher,
      },
    }

    try {
      const selling = await createSellingMutation({
        variables: { createSellingInput },
      })
      return selling
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
    }
  }

  return { createSelling }
}
