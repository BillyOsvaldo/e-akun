const userapp = require('./userapp.class');
const hooks = require('./userapp.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/userapp', new userapp());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userapp');

  service.hooks(hooks);
}
