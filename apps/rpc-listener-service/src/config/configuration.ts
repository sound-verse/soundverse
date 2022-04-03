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
      contractEvents: [
        {
          contractAddress: '0xCd9ED3779D6f5eb65cDf86aB49119698fEd718A0',
          listensTo: [EventType.TRANSFER, EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x4a8A068E7FeC8aEb84Ca940d6F82c2D483C8621C',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xEFfD9087543cb093F34F165AA86830274CA8bC47',
          listensTo: [EventType.UNLISTED_NFT],
          contractType: ContractType.MARKETPLACE,
          version: '0.1',
        },
      ],
    },
  },
});
