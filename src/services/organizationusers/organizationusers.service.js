// Initializes the `organizationusers` service on path `/organizationusers`
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizationusers.model');
const hooks = require('./organizationusers.hooks');
const filters = require('./organizationusers.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organizationusers',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizationusers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
