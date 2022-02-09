import { useEffect, useState } from 'react'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import SoundVerseERC721 from '../../artifacts/SoundVerseERC1155.sol/SoundVerseERC721.json'
import { useContractFunction, useEthers, useContractCall } from '@usedapp/core'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import { print } from 'graphql'
import axios from 'axios'
import Cookies from 'js-cookie'
import crypto from 'crypto'

const erc721ABI = SoundVerseERC721.abi
const contractaddress = process.env.NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS

const CREATE_NFT = gql`
  mutation createNft(
    $NFTFile: Upload!
    $pictureFile: Upload!
    $data: NftInput!
  ) {
    createNft(NFTFile: $NFTFile, pictureFile: $pictureFile, data: $data) {
      ipfsUrl
    }
  }
`

export type CreateNFT = {
  nftFile: File
  pictureFile: File
  name: string
  description: string
  tags?: string[]
  licences?: number
}

export const useCreateNFT = () => {
  const { account, library } = useEthers()

  const ercInterface = new utils.Interface(erc721ABI)
  const contract = new Contract(contractaddress, ercInterface)

  const { state: mintState, send: mintSend } = useContractFunction(
    contract as any,
    'createMasterItem',
    {}
  )

  const mint = async ({
    nftFile,
    pictureFile,
    name,
    description,
    tags = [],
    licences = 2,
  }: CreateNFT) => {
    const isConnected = account !== undefined
    const { chainId } = await library.getNetwork()

    console.log(chainId)

    if (isConnected) {
      const formData = new FormData()
      formData.append(
        'operations',
        JSON.stringify({
          query: print(CREATE_NFT),
          variables: {
            file: null,
            data: {
              metadata: { name, description },
              supply: licences,
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

      try {
        mintSend(
          process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
            ? `http://ipfs.local/${crypto.randomBytes(16).toString('hex')}` //random string for localhost
            : ipfsUrl,
          licences
        )
      } catch (e) {}
    } else {
      toast('Please Connect Wallet')
    }
  }

  return { mint, mintState }
}
