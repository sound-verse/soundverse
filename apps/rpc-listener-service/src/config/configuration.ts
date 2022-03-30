import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
          listensTo: [EventType.TRANSFER, EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0x9A676e781A523b5d0C0e43731313A708CB607508',
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
