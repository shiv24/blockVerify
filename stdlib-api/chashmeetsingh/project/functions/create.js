var mongoose = require('mongoose');

let cache = null;

mongoose.Promise = global.Promise;



var Schema = mongoose.Schema;

var manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  public_token: {
    type: String,
    required: true
  },
  address: String,
  logo: String
});

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let name = context.params.name || '';
  let public_token = context.params.public_token;
  let address = context.params.address || '';
  let logo = context.params.address || '';

  let manufacturer = {
    name: name,
    public_token: public_token,
    address: address,
    logo: logo
  };

  let uri = process.env['MONGO_URI'];
  mongoose.connect(uri);

  mongoose.Promise = global.Promise;
  var db = mongoose.connection;

  createmanufacturer(db, manufacturer, callback);

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

const createmanufacturer = (db, manufacturer, callback) => {
  db.collection('manufacturers').insertOne(manufacturer, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    return callback(null, {id: JSON.stringify(manufacturer._id)});
  });
};
