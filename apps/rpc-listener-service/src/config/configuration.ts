import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
          listensTo: [EventType.TRANSFER, EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
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
