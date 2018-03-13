const positionsmanagement = require('./positionsmanagement.class');
const hooks = require('./positionsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/positionsmanagement', new positionsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('positionsmanagement');

  service.hooks(hooks);
}
