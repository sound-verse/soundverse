module.exports = {
  images: {
    domains: ['localhost', 'cdn-nft.soundverse.io', 'cdn-user.soundverse.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/soundverses',
        permanent: true,
      },
      {
        source: '/landing',
        destination: '/soundverses',
        permanent: true,
      },
    ]
  },
}
