module.exports = {
  images: {
    domains: [
      'localhost',
      'soundverse-nft.ams3.digitaloceanspaces.com',
      'soundverse-user.ams3.digitaloceanspaces.com',
    ],
  },

  //TODO: define better CORS
  headers: { 'Access-Control-Allow-Origin': '*' },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/marketplace',
        permanent: true,
      },
      {
        source: '/landing',
        destination: '/marketplace',
        permanent: true,
      },
    ]
  },
}
