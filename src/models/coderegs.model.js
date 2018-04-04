const coderegsModel = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coderegs = new Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    organization: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizations'
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('coderegs', coderegs);
};

module.exports = coderegsModel
