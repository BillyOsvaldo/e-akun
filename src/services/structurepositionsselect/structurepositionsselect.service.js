const structurepositionsselect = require('./structurepositionsselect.class');
const hooks = require('./structurepositionsselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/structurepositionsselect', new structurepositionsselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structurepositionsselect');

  service.hooks(hooks);
}
