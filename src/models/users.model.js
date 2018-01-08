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
        required: true
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
    opd: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'opds'
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
