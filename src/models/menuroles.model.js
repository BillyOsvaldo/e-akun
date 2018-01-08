// menuroles-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const menuroles = new Schema({
    menu: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'menus'
    },
    role: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'roles'
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('menuroles', menuroles);
};
