import { useEffect, useState } from 'react'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import SoundVerseERC1155 from '../../artifacts/SoundVerseERC1155.sol/SoundVerseERC1155.json'
import { useContractFunction, useEthers, useContractCall } from '@usedapp/core'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import { print } from 'graphql'
import axios from 'axios'
import Cookies from 'js-cookie'

const erc115ABI = SoundVerseERC1155.abi
const contractaddress = process.env.NEXT_PUBLIC_ERC1155_CONTRACT_ADDRESS

const CREATE_NFT = gql`
  mutation createNft(
    $NFTFile: Upload!
    $pictureFile: Upload!
    $data: NftInput!
  ) {
    createNft(NFTFile: $NFTFile, pictureFile: $pictureFile, data: $data) {
      tokenId
      ipfsUrl
      fileUrl
    }
  }
`

function useCreateERC1155(nftFile, pictureFile, name, description, setShowing) {
  const { account } = useEthers()
  const isConnected = account !== undefined
  const ercInterface = new utils.Interface(erc115ABI)

  const contract = new Contract(contractaddress, ercInterface)

  const { state: mintState, send: mintSend } = useContractFunction(
    contract as any,
    'mint',
    {}
  )

  const handleMintClick = async () => {
    if (isConnected) {
      const formData = new FormData()
      formData.append(
        'operations',
        JSON.stringify({
          query: print(CREATE_NFT),
          variables: {
            file: null,
            data: { metadata: { name, description }, supply: 1 },
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
      const tokenId: number = response.data.data.createNft.tokenId
      const ipfsUrl: string = response.data.data.createNft.ipfsUrl

      console.log(tokenId, ipfsUrl)
      try {
        mintSend(
          account,
          tokenId,
          process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
            ? tokenId.toString()
            : ipfsUrl,
          1,
          utils.randomBytes(3)
        )
      } catch (e) {}
    } else {
      toast('Please Connect Wallet')
    }
  }

  return [handleMintClick, mintState]
}

export default useCreateERC1155
