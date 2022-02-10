import Blockies from 'react-blockies'

export const generateShortEthAddress = (
  ethAddress: string,
  length: number = 5
): string => {
  if (!ethAddress) {
    return
  }

  const firstPart = ethAddress.substring(0, length)
  const lastPart = ethAddress.substring(38, 42)

  return `${firstPart}...${lastPart}`
}
