module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const structures = new Schema({
    name: { type: String, required: true, index: true },
    desc: { type: String, required: true },
    nameOfPosition: { type: String }
  }, {
    timestamps: false
  });

  return mongooseClient.model('structures', structures);
};
