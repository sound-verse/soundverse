import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.ERC721,
          version: '0.1',
        },
      ],
    },
    testflight: {
      contractEvents: [
        {
          contractAddress: '0x2357a93fF873CA0CE783F71a87d1d38CaAd9fbCb',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.ERC721,
          version: '0.1',
        },
      ],
    },
  },
});
