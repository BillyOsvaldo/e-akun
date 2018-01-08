// Initializes the `opds` service on path `/opds`
const createService = require('feathers-mongoose');
const createModel = require('../../models/opds.model');
const hooks = require('./opds.hooks');
const filters = require('./opds.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'opds',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/opds', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('opds');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
