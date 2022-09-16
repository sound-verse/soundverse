import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
          listensTo: [EventType.MASTER_MINT_EVENT, EventType.TRANSFER],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
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
          contractAddress: '0x46392Cb3745a4CAa39eC2c771820AD2636ac9E2d',
          listensTo: [EventType.MASTER_MINT_EVENT, EventType.TRANSFER],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x997308E9563F5D8EE56E6129657fb2b5c5C7015C',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0x3F4e06072BF91A7c65c6e561a7c26AC48EE1A918',
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
    main: {
      contractEvents: [
        {
          contractAddress: '0x35C9bD5D6FE368B90628a9996B180A801c426669',
          listensTo: [EventType.MASTER_MINT_EVENT, EventType.TRANSFER],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x65280D8d5Ba28291f7F77aAd129E51331b52e86f',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xC625b4aaD5B6e11B805d95bF793E7595a84A9F2F',
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
