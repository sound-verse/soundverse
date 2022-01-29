module.exports = {
  images: {
    domains: ['localhost', 'soundverse-nft.ams3.digitaloceanspaces.com'],
  },
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
