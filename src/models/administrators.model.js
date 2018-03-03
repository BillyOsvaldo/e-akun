// administrators-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const administrators = new Schema({
    name: { type: String, required: true },
    tag: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('administrators', administrators);
};
