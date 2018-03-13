// Initializes the `structurepositions` service on path `/structurepositions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/structurepositions.model');
const hooks = require('./structurepositions.hooks');
const filters = require('./structurepositions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'structurepositions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/structurepositions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structurepositions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
