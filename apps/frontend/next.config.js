module.exports = {
  images: {
    domains: ['api.lorem.space'],
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
