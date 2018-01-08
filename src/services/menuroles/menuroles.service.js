// Initializes the `menuroles` service on path `/menuroles`
const createService = require('feathers-mongoose');
const createModel = require('../../models/menuroles.model');
const hooks = require('./menuroles.hooks');
const filters = require('./menuroles.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'menuroles',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/menuroles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('menuroles');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
