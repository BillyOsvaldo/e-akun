// Initializes the `postcodes` service on path `/postcodes`
const createService = require('feathers-mongoose');
const createModel = require('../../models/postcodes.model');
const hooks = require('./postcodes.hooks');
const filters = require('./postcodes.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'postcodes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/postcodes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('postcodes');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
