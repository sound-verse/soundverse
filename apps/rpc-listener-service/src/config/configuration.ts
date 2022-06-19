import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
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
          contractAddress: '0x8E1a10E4EeBc70a94BDaBF2750A8175A3C166022',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xe7CA5A98DCBd2863510af18d41F23E6b849a6B08',
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
