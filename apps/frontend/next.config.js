module.exports = {
  images: {
    domains: ['api.lorem.space'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ]
  },
}
