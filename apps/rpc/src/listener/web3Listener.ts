import Web3 from 'web3';
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';

require('dotenv').config()

const web3 = new Web3(process.env.RPC_URL);
// For local testing, enter your local ERC1155 contract address
const CONTRACT_ADDRESS = process.env.ERC1155_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(ERC1155ContractAbi as any, CONTRACT_ADDRESS);

async function getEvents() {
    let latest_block = await web3.eth.getBlockNumber();
    // let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc
    // console.log("latest: ", latest_block, "historical block: ", historical_block);
    console.log("latest: ", latest_block);
    /*     const events = await contract.getPastEvents(
            'Transfer', // change if your looking for a different event
            { fromBlock: historical_block, toBlock: 'latest' }
        ); */
    let options = {
        filter: {
            value: [],
        },
        fromBlock: latest_block
    };

   await contract.events.RPCCall(options,
        function (error, event) {
            console.log(web3.eth.abi.decodeParameters(['string', 'uint256'], event.raw.data))
        });
    /*     .on('data', event => console.log(event))
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str)) */
};


getEvents();