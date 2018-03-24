// Initializes the `drafts` service on path `/drafts`
const createService = require('feathers-mongoose');
const createModel = require('../../models/drafts.model');
const hooks = require('./drafts.hooks');
const filters = require('./drafts.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'drafts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/drafts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('drafts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
