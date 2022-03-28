import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
          listensTo: [EventType.TRANSFER, EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
          listensTo: [EventType.UNLISTED_NFT],
          contractType: ContractType.MARKETPLACE,
          version: '0.1',
        },
      ],
    },
    testflight: {
      contractEvents: [],
    },
  },
});
