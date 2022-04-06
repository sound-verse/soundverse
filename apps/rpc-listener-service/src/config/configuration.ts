import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
          listensTo: [EventType.TRANSFER, EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
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
