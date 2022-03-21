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
  CreateSellingMutation,
} from '../../common/graphql/schema'
import { NftType } from '../../common/types/nft-type.enum'
import { CREATE_SELLING } from '../../common/graphql/mutations/create-selling.mutation'
import { BigNumber, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useCallback, useEffect, useState } from 'react'

export const sellingVoucherTypes = {
  SVVoucher: [
    { name: 'nftContractAddress', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'sellCount', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'supply', type: 'uint256' },
    { name: 'isMaster', type: 'bool' },
    { name: 'currency', type: 'string' },
  ],
}

export type CreateSellingInputProps = {
  price: number
  amount: number
  nftType: NftType
  nft: Nft
}

const masterContractAddress = process.env.NEXT_PUBLIC_MASTER_CONTRACT_ADDRESS
const licenseContractAddress = process.env.NEXT_PUBLIC_LICENSE_CONTRACT_ADDRESS
const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useCreateSelling = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()
  const [sellCount, setSellCount] = useState<number>(undefined)
  const [createSellingInputProps, setCreateSellingInputProps] =
    useState<CreateSellingInputProps>(undefined)
  const [contractAddress, setContractAddress] = useState<string>(undefined)
  const [createSellingMutation] =
    useMutation<CreateSellingMutation>(CREATE_SELLING)
  const [selling, setSelling] = useState<Partial<Selling>>(undefined)

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state, send } = useContractFunction(contract, 'getSellCount')

  useEffect(() => {
    if (state.transaction) {
      const sellCount = parseInt(
        utils.formatEther(state.transaction as unknown as BigNumber)
      )
      setSellCount(sellCount)
    }
  }, [state])

  useEffect(() => {
    if (sellCount >= 0) {
      console.log(sellCount)
      saveVoucher()
    }
  }, [sellCount])

  useEffect(() => {
    if (contractAddress) {
      getSellCount()
    }
  }, [contractAddress])

  useEffect(() => {
    if (createSellingInputProps) {
      const contractAddress =
        createSellingInputProps.nftType === NftType.MASTER
          ? masterContractAddress
          : licenseContractAddress
      setContractAddress(contractAddress)
    }
  }, [createSellingInputProps])

  const getSellCount = async () => {
    await send(
      authUser.ethAddress,
      contractAddress,
      createSellingInputProps.nft.tokenId
        ? createSellingInputProps.nft.tokenId
        : 0
    )
  }

  const saveVoucher = useCallback(async () => {
    const voucher = {
      tokenId: createSellingInputProps.nft.tokenId
        ? createSellingInputProps.nft.tokenId
        : 0,
      nftContractAddress: await library._getAddress(contractAddress),
      price: createSellingInputProps.price,
      sellCount: sellCount,
      tokenUri:
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
          ? `http://ipfs.local/${crypto.randomBytes(16).toString('hex')}` //random string for localhost
          : createSellingInputProps.nft.ipfsUrl,
      supply: createSellingInputProps.amount,
      isMaster:
        createSellingInputProps.nftType === NftType.MASTER ? true : false,
      currency: 'MATIC',
    }

    const signingDomain = {
      name: 'SVVoucher',
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
      nftId: createSellingInputProps.nft.id,
      sellingVoucher: {
        ...signedVoucher,
      },
    }

    try {
      const newSelling = await createSellingMutation({
        variables: { createSellingInput },
      })
      setSelling(newSelling.data.createSelling)
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
    }
  }, [createSellingInputProps, contractAddress, sellCount])

  const createSelling = async (
    createSellingInputProps: CreateSellingInputProps
  ) => {
    if (!authUser || !chainId) {
      return
    }

    setCreateSellingInputProps(createSellingInputProps)
  }

  return { createSelling, selling }
}
