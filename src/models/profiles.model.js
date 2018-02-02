// profiles-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const profiles = new Schema({
    nip: {
        type: String
    },
    name: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      first_title: { type: String },
      last_title: { type: String },
    },
  	birth: {
      day: Date,
      place: String
    },
  	gender: { type: String, required: true },
  	address: {
  		postcode: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'postcodes'
      },
      detail: String
  	},
  	phone: {
  		lists: {
        type: [String],
        required: true,
        validate: arr => arr.filter(v => v).length
      },
      primary: {
        type: Number, required: true, default: 0
      }
  	}
  }, {
    timestamps: true
  });

  return mongooseClient.model('profiles', profiles);
};
