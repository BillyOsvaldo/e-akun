const administratorsmanagement = require('./administratorsmanagement.class');
const hooks = require('./administratorsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/administratorsmanagement', new administratorsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('administratorsmanagement');

  service.hooks(hooks);
}
