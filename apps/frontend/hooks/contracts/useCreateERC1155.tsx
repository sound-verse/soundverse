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
const contractaddress = '0xf3EFc648D3D3AaA49137e2aE456bce2CeCe7Ced7'

const CREATE_NFT = gql`
  mutation createNft($file: Upload!, $data: NftInput!) {
    createNft(file: $file, data: $data) {
      tokenId
      ipfsUrl
      fileUrl
    }
  }
`

function useCreateERC1155(file, name, description, setShowing) {
  const { account } = useEthers()
  const isConnected = account !== undefined
  const ercInterface = new utils.Interface(erc115ABI)

  const contract = new Contract(contractaddress, ercInterface)

  const { state: mintState, send: mintSend } = useContractFunction(
    contract as any,
    'mint',
    {}
  )

  const handleMintClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault
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
          '0': ['variables.file'],
        })
      )
      formData.append('0', file)

      const response = await axios.request({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        data: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get('JWT_TOKEN')}`,
        },
      })

      try {
        mintSend(
          account,
          response.data.data.createNft.tokenId,
          1,
          utils.randomBytes(3)
        )
      } catch (e) {}
    } else {
      toast('Please Connect Wallet')
    }
  }

  useEffect(() => {
    if (mintState.status == 'Success') {
      toast(mintState.status)

      // router.push('/landing')
    }
    if (mintState.status == 'Exception') {
      toast(mintState.errorMessage)
    }
    if (mintState.status == 'Mining') {
      setShowing(true)
    }
  }, [mintState.status])

  return [handleMintClick, mintState]
}

export default useCreateERC1155
