const structuresmanagement = require('./structuresmanagement.class');
const hooks = require('./structuresmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/structuresmanagement', new structuresmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structuresmanagement');

  service.hooks(hooks);
}
