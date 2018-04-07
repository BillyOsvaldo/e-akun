const allorganizationusersdraft = require('./allorganizationusersdraft.class');
const hooks = require('./allorganizationusersdraft.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/allorganizationusersdraft', new allorganizationusersdraft());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('allorganizationusersdraft');

  service.hooks(hooks);
}
