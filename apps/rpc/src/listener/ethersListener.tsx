import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';

const contractaddress = '0xf3EFc648D3D3AaA49137e2aE456bce2CeCe7Ced7'

function listenToERC1155() {
    const ercInterface = new utils.Interface(ERC1155ContractAbi)
    const ethers = require('ethers');

    const provider = new ethers.getDefaultProvider;
    const contract = new Contract(contractaddress, ercInterface, provider)

    var filter = {
        address: contractaddress,
        topics: [
            utils.id("RPCCall(string,uint256)")
        ]
    }

    contract.on(filter, (log, event) => {
        // Called when anyone changes the value

        console.log(event.uri);

        console.log(event.amount);
    })

}

export default listenToERC1155