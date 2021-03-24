module.exports = {
  async rewrites() {
    return [
      {
        source: '/:id/raw',
        destination: '/api/paste/:id/raw',
      },
    ];
  },
};
