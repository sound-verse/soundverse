import Web3 from 'web3';
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';

//Usage: ../../node_modules/.bin/ts-node ./src/scripts/mintNFT.ts

require('dotenv').config();

const main = async () => {
  const web3 = new Web3('https://matic-mumbai.chainstacklabs.com');
  const contractAddress = process.env.ERC155_CONTRACT_ADDRESS;

  const contract = new web3.eth.Contract(ERC1155ContractAbi as any, contractAddress);

  //to, id, minturi, amount, data
  const mint = await contract.methods.mint(
    '0xE39569EF2A516f0CA065a8dA698C79EE739D02c1',
    1,
    'https://someipfsurl.com',
    1,
    '',
  );

  console.log(mint);
};

try {
  if (require.main !== module) {
    console.log('This script can not be imported');
    process.exit(0);
  }

  void main();
} catch (ex) {
  console.error(ex);
}
