module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const structurepositions = new Schema({
    name: { type: String, required: true, index: true },
    desc: { type: String, required: true }
  }, {
    timestamps: false
  });

  return mongooseClient.model('structurepositions', structurepositions);
};
