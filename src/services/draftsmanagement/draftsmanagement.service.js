const draftsmanagement = require('./draftsmanagement.class');
const hooks = require('./draftsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/draftsmanagement', new draftsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('draftsmanagement');

  service.hooks(hooks);
}
