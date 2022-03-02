module.exports = {
  images: {
    domains: ['localhost', 'cdn-nft.soundverse.io', 'cdn-user.soundverse.io'],
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
