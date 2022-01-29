import Blockies from 'react-blockies'

export const generateShortEthAddress = (ethAddress: string): string => {
  if (!ethAddress) {
    return
  }

  const firstPart = ethAddress.substring(0, 5)
  const lastPart = ethAddress.substring(38, 42)

  return `${firstPart}...${lastPart}`
}
