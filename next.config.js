const INMEMORY = false;

module.exports = {
  INMEMORY,
  async rewrites() {
    return [
      {
        source: '/api/state',
        destination: 'http://localhost:3000/api/state', // Matched parameters can be used in the destination
      },
    ]
  },
}