import Web3 from 'web3';
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';
import { utils } from 'ethers';

//Usage: ../../node_modules/.bin/ts-node ./src/scripts/mintNFT.ts

require('dotenv').config();

const main = async () => {
  const web3 = new Web3('https://matic-mumbai.chainstacklabs.com');
  const contractAddress = '0xd00Bb2fe207486753712C9A41374E15c2A828e57';
  //For test purposes only!
  const walletAddress = '';
  const privateKey = '';

  const contract = new web3.eth.Contract(ERC1155ContractAbi as any, contractAddress);

  const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest'); //get latest nonce

  const tx = {
    from: walletAddress,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    //to, id, minturi, amount, data
    data: contract.methods.mint(walletAddress, 1, 'https://ipfsUrl.com', 1, 3).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
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
