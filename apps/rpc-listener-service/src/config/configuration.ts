import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
          listensTo: [
            EventType.REDEEMED_ITEM,
            EventType.REDEEMED_ITEM_SECONDARY_SALE,
            EventType.UNLISTED_NFT,
          ],
          contractType: ContractType.MARKETPLACE,
          version: '0.1',
        },
      ],
    },
    testflight: {
      contractEvents: [
        {
          contractAddress: '0xCd9ED3779D6f5eb65cDf86aB49119698fEd718A0',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xEFfD9087543cb093F34F165AA86830274CA8bC47',
          listensTo: [
            EventType.REDEEMED_ITEM,
            EventType.REDEEMED_ITEM_SECONDARY_SALE,
            EventType.UNLISTED_NFT,
          ],
          contractType: ContractType.MARKETPLACE,
          version: '0.1',
        },
      ],
    },
  },
});
