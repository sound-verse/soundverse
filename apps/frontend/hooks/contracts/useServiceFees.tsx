import { BigNumber, utils } from 'ethers'
import Web3 from 'web3'

export const useServiceFees = () => {
  const calculateServiceFees = (price: string) => {
    const floatPrice = parseFloat(Web3.utils.fromWei(price))
    return Web3.utils.toWei(
      (floatPrice * 1.035).toLocaleString('en-US', {
        maximumFractionDigits: 3,
      })
    )
  }
  return { calculateServiceFees }
}