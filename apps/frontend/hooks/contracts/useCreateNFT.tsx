import { useEthers } from '@usedapp/core'
import { gql } from '@apollo/client'
import { print } from 'graphql'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthContext } from '../../context/AuthContext'
import crypto from 'crypto'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'

const CREATE_NFT = gql`
  mutation createNft(
    $NFTFile: Upload!
    $pictureFile: Upload!
    $data: NftInput!
  ) {
    createNft(NFTFile: $NFTFile, pictureFile: $pictureFile, data: $data) {
      id
      ipfsUrl
    }
  }
`

const VERIFY_MINTED_NFT = gql`
  mutation verifyMintedNFT($input: VerifyNftInput!) {
    verifyMintedNFT(input: $input) {
      id
    }
  }
`

export type CreateNFT = {
  nftFile: File
  pictureFile: File
  name: string
  description: string
  tags?: string[]
  licenses: number
}

export type MintVoucher = {
  tokenId: number
  nftContractAddress: string
  price: number
  sellCount: number
  tokenUri: string
  supply: number
  isMaster: boolean
  signature?: string
}

export const mintVoucherTypes = {
  MINTVoucher: [
    { name: 'tokenId', type: 'uint256' },
    { name: 'nftContractAddress', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'sellCount', type: 'uint256' },
    { name: 'tokenUri', type: 'string' },
    { name: 'supply', type: 'uint256' },
    { name: 'isMaster', type: 'bool' },
  ],
}

const erc721ContractAddress = process.env.NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS
const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useCreateNFT = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()
  const [verifyMintedNft] = useMutation(VERIFY_MINTED_NFT)

  const createMintVoucher = async (createNftProps: CreateNFT) => {
    const { licenses } = createNftProps

    if (!authUser || !chainId) {
      return
    }

    let tokenUri, nftId
    try {
      const { ipfsUrl, id } = await prepareMint(createNftProps)
      tokenUri = ipfsUrl
      nftId = id
    } catch (error) {
      console.log(error)
      toast.error('This NFT was already minted!')
      return
    }

    const voucher: MintVoucher = {
      nftContractAddress: await library._getAddress(erc721ContractAddress),
      price: 0,
      tokenId: 0,
      tokenUri:
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
          ? `http://ipfs.local/${crypto.randomBytes(16).toString('hex')}` //random string for localhost
          : tokenUri,
      sellCount: 0,
      supply: licenses,
      isMaster: true,
    }

    const signingDomain = {
      name: 'SV-Voucher',
      version: '1',
      verifyingContract: marketContractAddress,
      chainId,
    }

    const signature = await library
      .getSigner()
      ._signTypedData(signingDomain, mintVoucherTypes, voucher)

    const singnedVoucher = {
      ...voucher,
      signature,
    }

    try {
      await verifyMintedNft({
        variables: { input: { id: nftId, mintVoucher: singnedVoucher } },
      })
    } catch (error) {
      console.log(error)
      toast.error('Error minting your NFT!')
    }
  }

  const prepareMint = async (
    createNftProps: CreateNFT
  ): Promise<{ ipfsUrl: string; id: string }> => {
    const {
      nftFile,
      pictureFile,
      name,
      description,
      tags = [],
      licenses,
    } = createNftProps

    const formData = new FormData()
    formData.append(
      'operations',
      JSON.stringify({
        query: print(CREATE_NFT),
        variables: {
          NFTFile: null,
          pictureFile: null,
          data: {
            metadata: { name, description },
            supply: parseInt(licenses.toString()),
            tags,
            chainId,
          },
        },
      })
    )
    formData.append(
      'map',
      JSON.stringify({
        '0': ['variables.NFTFile'],
        '1': ['variables.pictureFile'],
      })
    )
    formData.append('0', nftFile)
    formData.append('1', pictureFile)

    const response = await axios.request({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      data: formData,
      headers: {
        Authorization: `Bearer ${Cookies.get('JWT_TOKEN')}`,
      },
    })
    const ipfsUrl: string = response.data.data.createNft.ipfsUrl
    const id: string = response.data.data.createNft.id

    return {
      ipfsUrl,
      id,
    }
  }

  return { createMintVoucher, prepareMint }
}
