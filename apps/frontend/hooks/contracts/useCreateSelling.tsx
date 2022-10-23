import toast from 'react-hot-toast'
import { FetchResult, useMutation } from '@apollo/client'
import {
  Nft,
  Selling,
  CreateSellingMutation,
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
import { useSignTypedData } from '@web3modal/react'

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
  const [createSellingMutation] = useMutation<
    CreateSellingMutation,
    CreateSellingMutationVariables
  >(CREATE_SELLING)

  const [createMintSellingMutation] = useMutation<
    CreateMintSellingMutation,
    CreateMintSellingMutationVariables
  >(CREATE_MINT_SELLING)

  const [selling, setSelling] = useState<Partial<Selling>>(undefined)

  const {
    data: signature,
    error,
    signTypedData,
  } = useSignTypedData({
    types: undefined,
    value: undefined,
    domain: undefined,
  })

  const saveVoucher = useCallback(
    async (createSellingInputProps: CreateSellingInputProps) => {
      const isMintVoucher =
        createSellingInputProps?.nft?.tokenId > 0 ? false : true

      const contractAddress =
        createSellingInputProps.nftType === NftType.Master
          ? masterContractAddress
          : licenseContractAddress

      let voucher, voucherTypes
      if (!createSellingInputProps) {
        voucher = undefined
        voucherTypes = undefined
      } else if (isMintVoucher) {
        voucher = {
          price: Web3.utils.toWei(createSellingInputProps.price.toString()),
          tokenUri: createSellingInputProps.nft.ipfsUrl,
          supply: createSellingInputProps.amount,
          maxSupply: createSellingInputProps.nft.supply,
          isMaster:
            createSellingInputProps.nftType === NftType.Master ? true : false,
          currency: 'ETH',
          royaltyFeeMaster: createSellingInputProps.nft.royaltyFeeMaster,
          royaltyFeeLicense: createSellingInputProps.nft.royaltyFeeLicense,
          creatorOwnerSplit: createSellingInputProps.nft.creatorOwnerSplit,
          validUntil: +add(new Date(), { years: 1 }),
        }
        voucherTypes = mintVoucherTypes
      } else {
        voucher = {
          nftContractAddress: contractAddress.toLowerCase(),
          price: Web3.utils.toWei(createSellingInputProps.price.toString()),
          tokenUri: createSellingInputProps.nft.ipfsUrl,
          supply: createSellingInputProps.amount,
          isMaster:
            createSellingInputProps.nftType === NftType.Master ? true : false,
          currency: 'ETH',
          validUntil: +add(new Date(), { years: 1 }),
        }
        voucherTypes = saleVoucherTypes
      }

      const signingDomain = {
        name: 'SVVoucher',
        version: '1',
        verifyingContract: marketContractAddress.toLowerCase(),
        chainId: createSellingInputProps.nft.chainId,
      }

      let signature = ''

      try {
        signature = await signTypedData({
          domain: signingDomain,
          types: voucherTypes,
          value: voucher,
        })
      } catch {
        console.log(error)
        toast.error('Error listing your NFT!', { id: '1' })
        return
      }

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
        toast.error('Error listing your NFT!', { id: '1' })
      }
    },
    [error]
  )

  const createSelling = async (
    createSellingInputProps: CreateSellingInputProps
  ) => {
    await saveVoucher(createSellingInputProps)
  }

  return { createSelling, selling }
}
