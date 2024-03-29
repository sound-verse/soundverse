import toast from 'react-hot-toast'
import { Nft, NftType, Selling } from '../../common/graphql/schema.d'
import { utils } from 'ethers'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'
import { useContractWrite } from '@web3modal/react'

export type UnlistSellingProps = {
  selling: Selling
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useUnlistSelling = () => {
  const abi = new utils.Interface(MarketContractAbi.abi)
  const [unlistProps, setUnlistProps] = useState<UnlistSellingProps>(undefined)
  const [status, setStatus] = useState<'success' | 'error' | 'pending'>(
    'pending'
  )

  const contractConfig = {
    addressOrName: marketContractAddress,
    contractInterface: abi,
  }

  const { write, data, error } = useContractWrite({
    ...contractConfig,
    functionName: '',
  })

  useEffect(() => {
    if (unlistProps) {
      executeUnlistNft()
    }
  }, [unlistProps])

  useEffect(() => {
    if (!data) {
      return
    }
    data.wait(1).then(() => {
      setStatus('success')
    })
  }, [data])

  useEffect(() => {
    if (!error) {
      return
    }
    setStatus('error')
  }, [error])

  const unlistNft = (unlistProps: UnlistSellingProps) => {
    setUnlistProps(unlistProps)
  }

  const isMintVoucher = unlistProps?.selling?.mintVoucher ? true : false

  const executeUnlistNft = async () => {
    try {
      if (isMintVoucher) {
        await write({
          ...contractConfig,
          args: [unlistProps.selling.mintVoucher],
          functionName: 'unlistMintVoucher',
        })
      } else {
        await write({
          ...contractConfig,
          args: [unlistProps.selling.saleVoucher],
          functionName: 'unlistSaleVoucher',
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Error unlisting your NFT!', { id: '1' })
    }
  }

  return {
    unlistNft,
    unlistNftState: status,
  }
}
