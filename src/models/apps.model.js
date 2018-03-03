// apps-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apps = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    service: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: Boolean, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apps', apps);
};
