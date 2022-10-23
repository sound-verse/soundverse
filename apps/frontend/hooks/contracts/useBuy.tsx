import { Nft, NftOwner, Selling } from '../../common/graphql/schema.d'
import { BigNumber, ethers, utils } from 'ethers'
import MarketContractAbi from '../../common/artifacts/MarketContract.json'
import { useEffect, useState } from 'react'
import { useContractWrite } from '@web3modal/react'

export type BuyProps = {
  nft: Nft
  selling: Selling
  amountToBuy: number
}

const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS

export const useBuy = () => {
  const [buyProps, setBuyProps] = useState<BuyProps>(undefined)

  //TODO: currently just taking the recent marketplace contract address - we should provide fallback for older marketplace contract addresss used in the vouchers

  const abi = new utils.Interface(MarketContractAbi.abi)

  const contractConfig = {
    addressOrName: marketContractAddress,
    contractInterface: abi,
  }

  const { write, data, error } = useContractWrite({
    ...contractConfig,
    functionName: '',
  })

  useEffect(() => {
    if (buyProps) {
      executeBuy()
    }
  }, [buyProps])

  const isMintVoucher = buyProps?.selling?.saleVoucher ? false : true

  const executeBuy = async () => {
    if (isMintVoucher) {
      await write({
        ...contractConfig,
        overrides: {
          value: buyProps.selling.mintVoucher.price,
        },
        args: [buyProps.amountToBuy, buyProps.selling.mintVoucher],
        functionName: 'redeemMintVoucher',
      })
    } else {
      await write({
        ...contractConfig,
        overrides: {
          value: buyProps.selling.saleVoucher.price,
          customData: {
            amountToBuy: buyProps.amountToBuy,
            saleVoucher: buyProps.selling.saleVoucher,
          },
        },
        functionName: 'redeemSaleVoucher',
      })
    }
  }

  const buyNft = async (buyProps: BuyProps) => {
    setBuyProps(buyProps)
  }

  return {
    buyNft,
    buyNftState: {
      txHash: data,
      error,
    },
  }
}
