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
          contractAddress: '0x52e49020DB71625ddE3450C793907e3fD701DFAA',
          listensTo: [EventType.MASTER_MINT_EVENT, EventType.TRANSFER],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x18861B0609eEE284e711e6a5d637456D4941E918',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xd945184A2F8e8eA039b1397c3F0758d29215Ff3a',
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
          contractAddress: '0x52e49020DB71625ddE3450C793907e3fD701DFAA',
          listensTo: [EventType.MASTER_MINT_EVENT, EventType.TRANSFER],
          contractType: ContractType.MASTER,
          version: '0.1',
        },
        {
          contractAddress: '0x18861B0609eEE284e711e6a5d637456D4941E918',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.LICENSE,
          version: '0.1',
        },
        {
          contractAddress: '0xd945184A2F8e8eA039b1397c3F0758d29215Ff3a',
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
