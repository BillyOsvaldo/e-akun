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
      first_name: String,
      last_name: String,
      first_title: String,
      last_title: String
    },
  	birth: {
      day: Date,
      place: String
    },
  	gender: {
  		type: String,
      required: true
  	},
  	address: {
  		postcode: String,
      detail: String
  	},
  	phone: {
  		lists: [String],
      primary_key: Number
  	}
  }, {
    timestamps: true
  });

  return mongooseClient.model('profiles', profiles);
};
