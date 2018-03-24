module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const drafts = new Schema({
    user: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    organization: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizations',
      required: true
    },
    parent: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures'
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }, {
    timestamps: true
  });

  return mongooseClient.model('drafts', drafts);
};
