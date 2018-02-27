// organizations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizations = new Schema({
    name: { type: String, required: true },
    address: {
      postcode: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'postcodes'
      },
      detail: { type: String, default: '' }
    },
    phone: { type: String, required: true },
    fax: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    status: { type: Boolean, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('organizations', organizations);
};
