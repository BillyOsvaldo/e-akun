module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizationusersdraft = new Schema({
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
    inside: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures'
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }, {
    timestamps: true
  });

  return mongooseClient.model('organizationusersdraft', organizationusersdraft);
};
