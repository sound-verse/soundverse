import { ERC1155ContractAbi } from '@soundverse/shared-rpc-listener-service';
import { utils } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

//Usage: ../../node_modules/.bin/ts-node ./src/scripts/mintNFT.ts

// require('dotenv').config();

const main = async () => {
  // const web3 = new Web3(
  //   'wss://bold-lively-wave.matic-testnet.quiknode.pro/a44093358d2164fa6f0e82d6c06fe808ed6e8854/',
  // );
  // const contractAddress = '0xd00Bb2fe207486753712C9A41374E15c2A828e57';
  // const walletAddress = '0xE39569EF2A516f0CA065a8dA698C79EE739D02c1';
  // const privateKey = 'dba25f2301e49b76b8381d57007312555d8fed8b4e54372838f67b08c334d026';

  const web3 = new Web3('ws://127.0.0.1:8545/');
  const contractAddress = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
  const walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const privateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const contract = new web3.eth.Contract(ERC1155ContractAbi as AbiItem[], contractAddress);

  const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest'); //get latest nonce
  const rnd = Math.ceil(Math.random() * 451811354);
  const tx = {
    from: walletAddress,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    //to, id, minturi, amount, data
    data: contract.methods.mint(walletAddress, 117, `https://ipfsUrl.com/${117}`, 1, 3).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

  process.exit(0);
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
