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
          contractAddress: '0x247b064C419A7B80261d70Dea30e76464301e0fD',
          listensTo: [EventType.MASTER_MINT_EVENT],
          contractType: ContractType.ERC721,
          version: '0.1',
        },
      ],
    },
  },
});
