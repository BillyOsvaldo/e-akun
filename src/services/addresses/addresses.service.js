const addresses = require('./addresses.class');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/addresses', new addresses());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('addresses');
}
