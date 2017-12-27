const checkuser = require('./checkuser.class');
const hooks = require('./checkuser.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkuser', new checkuser());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkuser');
  service.hooks(hooks);
  
}
