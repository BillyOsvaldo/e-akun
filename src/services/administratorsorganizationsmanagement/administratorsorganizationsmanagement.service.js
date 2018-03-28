const administratorsorganizationsmanagement = require('./administratorsorganizationsmanagement.class');
const hooks = require('./administratorsorganizationsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/administratorsorganizationsmanagement', new administratorsorganizationsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('administratorsorganizationsmanagement');

  service.hooks(hooks);
}
