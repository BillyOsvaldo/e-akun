const coderegsmanagement = require('./coderegsmanagement.class');
const hooks = require('./coderegsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/coderegsmanagement', new coderegsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('coderegsmanagement');

  service.hooks(hooks);
}
