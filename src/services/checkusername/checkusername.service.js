const checkusername = require('./checkusername.class');
const hooks = require('./checkusername.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkusername', new checkusername());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkusername');
  service.hooks(hooks);
  
}
