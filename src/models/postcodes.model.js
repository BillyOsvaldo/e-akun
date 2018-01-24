// postcodes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const postcodes = new Schema({
    provinsi: { type: String, required: true },
    kotakab: { type: String, required: true },
    kecamatan: { type: String, required: true },
    kodepos: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('postcodes', postcodes);
};
