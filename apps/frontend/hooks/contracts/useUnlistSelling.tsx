import { useContractFunction, useEthers } from '@usedapp/core'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Nft } from '../../common/graphql/schema'
import { NftType } from '../../common/types/nft-type.enum'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect } from 'react'

export type UnlistSellingProps = {
  nftType: NftType
  nft: Nft
}

const masterContractAddress = process.env.NEXT_PUBLIC_MASTER_CONTRACT_ADDRESS
const licenseContractAddress = process.env.NEXT_PUBLIC_LICENSE_CONTRACT_ADDRESS
const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useUnlistSelling = () => {
  const { authUser } = useAuthContext()
  const { chainId, library } = useEthers()

  const abi = new utils.Interface(MarketContractAbi.abi)
  const contract = new Contract(marketContractAddress, abi)

  const { state, send } = useContractFunction(contract, 'incrementSellCount')

  useEffect(() => {
    console.log(state)
  }, [state])

  const unlistNft = async (createSellingInputProps: UnlistSellingProps) => {
    if (!authUser || !chainId) {
      return
    }

    const contractAddress =
      createSellingInputProps.nftType === NftType.MASTER
        ? masterContractAddress
        : licenseContractAddress

    try {
      await send(
        contractAddress,
        createSellingInputProps.nft.tokenId
          ? createSellingInputProps.nft.tokenId
          : 0
      )
    } catch (error) {
      console.log(error)
      toast.error('Error listing your NFT!')
    }
  }

  return { unlistNft }
}
