const organizationsmanagement = require('./organizationsmanagement.class');
const hooks = require('./organizationsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationsmanagement', new organizationsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationsmanagement');

  service.hooks(hooks);
}
