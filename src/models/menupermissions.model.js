// menupermissions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const menupermissions = new Schema({
    menu: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'menus'
    },
    permission: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'permissions'
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('menupermissions', menupermissions);
};
