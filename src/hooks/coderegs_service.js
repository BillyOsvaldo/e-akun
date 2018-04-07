const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const coderegsHook = {}
coderegsHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'organizations',
        nameAs: 'organization',
        parentField: 'organization',
        childField: '_id'
      },
    ]
  }

  await populate({ schema: populateSchema })(context)
}

module.exports = coderegsHook
