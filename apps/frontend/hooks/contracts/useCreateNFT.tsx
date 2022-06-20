import { useEthers } from '@usedapp/core'
import { gql } from '@apollo/client'
import { print } from 'graphql'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useLogin } from '../useLogin'
import toast from 'react-hot-toast'

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

export type CreateNFT = {
  nftFile: File
  pictureFile: File
  name: string
  description: string
  tags?: string[]
  licenses: number
  royaltyFeeMaster: number
  royaltyFeeLicense: number
  creatorOwnerSplit: number
}

export const useCreateNFT = () => {
  const { chainId } = useEthers()
  const { logout } = useLogin()

  const prepareMint = async (
    createNftProps: CreateNFT
  ): Promise<{ ipfsUrl: string; id: string }> => {
    if (!chainId) {
      toast.error('Please reconnect your wallet.')
      logout()
      return
    }

    const {
      nftFile,
      pictureFile,
      name,
      description,
      tags = [],
      licenses,
      royaltyFeeMaster,
      royaltyFeeLicense,
      creatorOwnerSplit,
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
            royaltyFeeMaster: royaltyFeeMaster * 100,
            royaltyFeeLicense: royaltyFeeLicense * 100,
            creatorOwnerSplit: creatorOwnerSplit * 100,
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

  return { prepareMint }
}
