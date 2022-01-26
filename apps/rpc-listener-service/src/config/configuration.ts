export default () => ({
  RPCListenerConfig: {
    local: {
      contractEvents: [
        {
          contractAddress: '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9',
          listensTo: ['TransferSingle'],
          type: 'ERC1155',
          version: '0.1',
        },
      ],
    },
    testflight: {
      contractEvents: [
        {
          contractAddress: '0xf3EFc648D3D3AaA49137e2aE456bce2CeCe7Ced7',
          listensTo: ['TransferSingle'],
          type: 'ERC1155',
          version: '0.1',
        },
      ],
    },
  },
});
