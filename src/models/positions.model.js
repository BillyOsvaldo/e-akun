module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const positions = new Schema({
    name: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures',
      required: true
    },
    parent: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures',
      required: true
    },
    alt_parent: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizationstructures'
    }
  }, {
    timestamps: false
  });

  return mongooseClient.model('positions', positions);
};
