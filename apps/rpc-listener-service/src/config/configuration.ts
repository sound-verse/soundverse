import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
          listensTo: [
            EventType.REDEEMED_MINT_VOUCHER,
            EventType.REDEEMED_SALE_VOUCHER,
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
            EventType.REDEEMED_MINT_VOUCHER,
            EventType.REDEEMED_SALE_VOUCHER,
            EventType.UNLISTED_NFT,
          ],
          contractType: ContractType.MARKETPLACE,
          version: '0.1',
        },
      ],
    },
  },
});
