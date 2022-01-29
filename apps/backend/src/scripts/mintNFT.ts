import Web3 from 'web3';
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';
import { utils } from 'ethers';

//Usage: ../../node_modules/.bin/ts-node ./src/scripts/mintNFT.ts

require('dotenv').config();

const main = async () => {
  const web3 = new Web3('http://127.0.0.1:8545/');
  const contractAddress = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
  //For test purposes only!
  const walletAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const privateKey = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

  const contract = new web3.eth.Contract(ERC1155ContractAbi as any, contractAddress);

  const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest'); //get latest nonce

  const tx = {
    from: walletAddress,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    //to, id, minturi, amount, data
    data: contract.methods.mint(walletAddress, 11, 'https://ipfsUrl.com/11', 1, 3).encodeABI(),
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
