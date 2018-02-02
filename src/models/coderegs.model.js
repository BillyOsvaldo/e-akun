// coderegs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coderegs = new Schema({
    email: { type: String, required: true },
    opd: { type: mongooseClient.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model('coderegs', coderegs);
};
