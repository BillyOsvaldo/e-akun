module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizationstructures = new Schema({
    name: { type: String },
    structure: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'structures',
      required: true
    },
    organization: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'organizations',
      required: true
    },
    role: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'roles'
    },
    order: { type: Number, default: 1 },
    children: [{
      type: mongooseClient.Schema.Types.ObjectId
    }],
    parent: { type: Number, default: null },
    alt_parent: { type: Number, default: null }
  }, {
    timestamps: false
  });

  return mongooseClient.model('organizationstructures', organizationstructures);
};
