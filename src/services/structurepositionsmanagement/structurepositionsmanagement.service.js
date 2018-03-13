const structurepositionsmanagement = require('./structurepositionsmanagement.class');
const hooks = require('./structurepositionsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/structurepositionsmanagement', new structurepositionsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structurepositionsmanagement');

  service.hooks(hooks);
}
