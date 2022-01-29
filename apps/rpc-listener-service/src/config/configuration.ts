import { EventType, ContractType } from '@soundverse/shared-rpc-listener-service';

export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.ERC1155,
          version: '0.1',
        },
      ],
    },
    testflight: {
      contractEvents: [
        {
          contractAddress: '0x247b064C419A7B80261d70Dea30e76464301e0fD',
          listensTo: [EventType.TRANSFER_SINGLE],
          contractType: ContractType.ERC1155,
          version: '0.1',
        },
      ],
    },
  },
});
