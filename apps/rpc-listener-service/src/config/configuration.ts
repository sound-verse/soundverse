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
          contractAddress: '0xd00Bb2fe207486753712C9A41374E15c2A828e57',
          listensTo: ['TransferSingle'],
          type: 'ERC1155',
          version: '0.1',
        },
      ],
    },
  },
});
