const checkemail = require('./checkemail.class');
const hooks = require('./checkemail.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkemail', new checkemail());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkemail');
  service.hooks(hooks);
  
}
