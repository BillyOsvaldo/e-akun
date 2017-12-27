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
  	addfirst: {
  		type: String
  	},
  	addlast: {
  		type: String
  	},
  	fullname: {
  		type: String,
      	required: true
  	},
  	birthplace: {
  		type: Date
  	},
  	birthday: {
  		type: String,
      	required: true
  	},
  	gender: {
  		type: String,
      	required: true
  	},
  	address: {
  		type: String
  	},
  	phone: {
  		type: String,
      	required: true
  	}
  }, {
    timestamps: true
  });

  return mongooseClient.model('profiles', profiles);
};
