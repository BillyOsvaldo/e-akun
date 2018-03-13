var validator = require('validator')

// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: email => validator.isEmail(email)
    },
    password: {
        type: String
    },
    profile: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'profiles'
    },
    role: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'roles'
    },
    permissions: [{
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'permissions'
    }],
    organization: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizations'
    },
    position:  {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'positions',
      default: null
    },
    parent:  {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'positions',
      default: null
    },
    status: { type: Boolean, default: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
