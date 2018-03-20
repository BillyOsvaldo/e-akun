module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizationstructuresusers = new Schema({
    userId: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    organizationstructure: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures'
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }, {
    timestamps: true
  });

  return mongooseClient.model('organizationstructuresusers', organizationstructuresusers);
};
