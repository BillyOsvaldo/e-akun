const appsmanagement = require('./appsmanagement.class');
const hooks = require('./appsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/appsmanagement', new appsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('appsmanagement');

  service.hooks(hooks);
}
