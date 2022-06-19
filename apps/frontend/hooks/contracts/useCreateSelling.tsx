import { useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FetchResult, useMutation } from '@apollo/client'
import {
  Nft,
  CreateSellingInput,
  Selling,
  CreateSellingMutation,
  CreateMintSellingInput,
  NftType,
  CreateMintSellingMutation,
  CreateSellingMutationVariables,
  CreateMintSellingMutationVariables,
  MintVoucherInput,
  SaleVoucherInput,
} from '../../common/graphql/schema.d'
import { CREATE_SELLING } from '../../common/graphql/mutations/create-selling.mutation'
import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { CREATE_MINT_SELLING } from '../../common/graphql/mutations/create-mint-selling.mutation'
import { add } from 'date-fns'

export const saleVoucherTypes = {
  SVVoucher: [
    { name: 'nftContractAddress', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'supply', type: 'uint256' },
    { name: 'isMaster', type: 'bool' },
    { name: 'currency', type: 'string' },
    { name: 'validUntil', type: 'uint256' },
  ],
}

export const mintVoucherTypes = {
  SVVoucher: [
    { name: 'price', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'supply', type: 'uint256' },
    { name: 'maxSupply', type: 'uint256' },
    { name: 'isMaster', type: 'bool' },
    { name: 'currency', type: 'string' },
    { name: 'royaltyFeeMaster', type: 'uint96' },
    { name: 'royaltyFeeLicense', type: 'uint96' },
    { name: 'creatorOwnerSplit', type: 'uint96' },
    { name: 'validUntil', type: 'uint256' },
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
  const [createSellingInputProps, setCreateSellingInputProps] =
    useState<CreateSellingInputProps>(undefined)
  const [contractAddress, setContractAddress] = useState<string>(undefined)

  const [createSellingMutation] = useMutation<
    CreateSellingMutation,
    CreateSellingMutationVariables
  >(CREATE_SELLING)

  const [createMintSellingMutation] = useMutation<
    CreateMintSellingMutation,
    CreateMintSellingMutationVariables
  >(CREATE_MINT_SELLING)

  const [selling, setSelling] = useState<Partial<Selling>>(undefined)

  useEffect(() => {
    if (contractAddress) {
      saveVoucher()
    }
  }, [contractAddress])

  useEffect(() => {
    if (createSellingInputProps) {
      const contractAddress =
        createSellingInputProps.nftType === NftType.Master
          ? masterContractAddress
          : licenseContractAddress
      setContractAddress(contractAddress)
    }
  }, [createSellingInputProps])

  const saveVoucher = useCallback(async () => {
    const isMintVoucher = createSellingInputProps.nft.tokenId > 0 ? false : true

    let voucher

    if (isMintVoucher) {
      voucher = {
        price: Web3.utils.toWei(createSellingInputProps.price.toString()),
        tokenUri: createSellingInputProps.nft.ipfsUrl,
        supply: createSellingInputProps.amount,
        maxSupply: createSellingInputProps.nft.supply,
        isMaster:
          createSellingInputProps.nftType === NftType.Master ? true : false,
        currency: 'MATIC',
        royaltyFeeMaster: createSellingInputProps.nft.royaltyFeeMaster,
        royaltyFeeLicense: createSellingInputProps.nft.royaltyFeeLicense,
        creatorOwnerSplit: createSellingInputProps.nft.creatorOwnerSplit,
        validUntil: +add(new Date(), { years: 1 }),
      }
    } else {
      voucher = {
        nftContractAddress: await (
          await library._getAddress(contractAddress)
        ).toLowerCase(),
        price: Web3.utils.toWei(createSellingInputProps.price.toString()),
        tokenUri: createSellingInputProps.nft.ipfsUrl,
        supply: createSellingInputProps.amount,
        isMaster:
          createSellingInputProps.nftType === NftType.Master ? true : false,
        currency: 'MATIC',
        validUntil: +add(new Date(), { years: 1 }),
      }
    }

    const signingDomain = {
      name: 'SVVoucher',
      version: '1',
      verifyingContract: marketContractAddress.toLowerCase(),
      chainId,
    }

    const voucherTypes = isMintVoucher ? mintVoucherTypes : saleVoucherTypes

    const signature = await library
      .getSigner()
      ._signTypedData(signingDomain, voucherTypes, {
        ...voucher,
      })

    let voucherInput: MintVoucherInput | SaleVoucherInput

    if (isMintVoucher) {
      const { currency, isMaster, price, supply, validUntil } = voucher
      voucherInput = {
        currency,
        isMaster,
        price,
        supply,
        validUntil,
        signature,
      }
    } else {
      const {
        currency,
        isMaster,
        price,
        supply,
        validUntil,
        nftContractAddress,
      } = voucher
      voucherInput = {
        currency,
        isMaster,
        price,
        supply,
        validUntil,
        nftContractAddress,
        signature,
      }
    }

    let createSellingInput
    if (isMintVoucher) {
      createSellingInput = {
        nftId: createSellingInputProps.nft.id,
        mintVoucherInput: {
          ...voucherInput,
        },
      }
    } else {
      createSellingInput = {
        nftId: createSellingInputProps.nft.id,
        saleVoucherInput: {
          ...voucherInput,
        },
      }
    }

    try {
      const newSelling = !isMintVoucher
        ? await createSellingMutation({
            variables: { createSellingInput },
          })
        : await createMintSellingMutation({
            variables: { createMintSellingInput: createSellingInput },
          })

      setSelling(
        isMintVoucher
          ? (newSelling as FetchResult<CreateMintSellingMutation>).data
              .createMintSelling
          : (newSelling as FetchResult<CreateSellingMutation>).data
              .createSelling
      )
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
    }
  }, [createSellingInputProps, contractAddress])

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
