module.exports = {
  images: {
    domains: ['localhost', 'digitaloceanspaces.com'],
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
