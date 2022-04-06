import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
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
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { BigNumber, utils } from 'ethers';

export const sellingVoucherTypes = {
  SVVoucher: [
    { name: 'nftContractAddress', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'sellCount', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'supply', type: 'uint256' },
    { name: 'maxSupply', type: 'uint256' },
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

  const { state, send } = useContractFunction(contract as any, 'getSellCount')

  useEffect(() => {
    if (state.transaction) {
      const sellCount = BigNumber.from(state.transaction).toNumber()
      console.log(sellCount)
      setSellCount(sellCount)
    }
  }, [state])

  useEffect(() => {
    if (sellCount >= 0) {
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
      createSellingInputProps.nft.ipfsUrl
    )
  }

  const saveVoucher = useCallback(async () => {
    const voucher = {
      tokenId: createSellingInputProps.nft.tokenId
        ? createSellingInputProps.nft.tokenId
        : 0,
      nftContractAddress: await (
        await library._getAddress(contractAddress)
      ).toLowerCase(),
      price: Web3.utils.toWei(createSellingInputProps.price.toString()),
      sellCount: sellCount,
      tokenUri: createSellingInputProps.nft.ipfsUrl,
      supply: createSellingInputProps.amount,
      maxSupply: createSellingInputProps.nft.supply,
      isMaster:
        createSellingInputProps.nftType === NftType.MASTER ? true : false,
      currency: 'MATIC',
    }

    const signingDomain = {
      name: 'SVVoucher',
      version: '1',
      verifyingContract: marketContractAddress.toLowerCase(),
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
