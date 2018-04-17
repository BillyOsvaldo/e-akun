// Initializes the `organizationstructures` service on path `/organizationstructures`
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizationstructures.model');
const hooks = require('./organizationstructures.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organizationstructures',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizationstructures', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructures');

  service.hooks(hooks);
};
