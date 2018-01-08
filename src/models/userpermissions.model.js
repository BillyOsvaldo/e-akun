// userpermissions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const userpermissions = new Schema({
    user: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users'
    },
    permission: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'permissions'
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('userpermissions', userpermissions);
};
