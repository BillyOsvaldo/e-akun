const coderegsModel = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coderegs = new Schema({
    email: { type: String, required: true },
    opd: { type: mongooseClient.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
  }, {
    timestamps: true
  });

  return mongooseClient.model('coderegs', coderegs);
};

module.exports = coderegsModel
