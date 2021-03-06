module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizationstructuresusersdraft = new Schema({
    user: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    organizationstructure: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures',
      required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }, {
    timestamps: true
  });

  return mongooseClient.model('organizationstructuresusersdraft', organizationstructuresusersdraft);
};
