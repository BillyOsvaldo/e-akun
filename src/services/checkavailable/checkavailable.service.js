const checkavailable = require('./checkavailable.class');
const hooks = require('./checkavailable.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkavailable', new checkavailable());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkavailable');
  service.hooks(hooks);
  
}
