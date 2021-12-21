import erc20 from "../abis/erc20.json";
import soundverse from "../abis/SoundVerseToken.json";

export const addresses = {
  SOUND_VERSE: "0xB04222DD795D04CE3ED3f0efB7E9Dc314590F2F7",
}

export const abis = {
  ERC20: erc20,
  SOUND_VERSE: soundverse
}

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
export const INFURA_ID = ''

export const NETWORK_NAME = 'goerli'