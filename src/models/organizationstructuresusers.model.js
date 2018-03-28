module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizationstructuresusers = new Schema({
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
    organizationuser: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationusers'
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }, {
    timestamps: true
  });

  return mongooseClient.model('organizationstructuresusers', organizationstructuresusers);
};
