// Initializes the `coderegs` service on path `/coderegs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/coderegs.model');
const hooks = require('./coderegs.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'coderegs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/coderegs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('coderegs');

  service.hooks(hooks);
};
