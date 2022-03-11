import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
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
