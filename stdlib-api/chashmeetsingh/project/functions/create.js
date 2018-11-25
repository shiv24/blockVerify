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
  }
});

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let name = context.params.name || '';
  let public_token = context.params.public_token;
  let manufacturer = {
    name: name,
    public_token: public_token
  };

  let uri = process.env['MONGO_URI'];
  mongoose.connect(uri);

  mongoose.Promise = global.Promise;
  var db = mongoose.connection;

  createmanufacturer(db, manufacturer, callback);

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  // try {
  //   if (cache === null) {
  //     MongoClient.connect(uri, (error, db) => {
  //       if (error) {
  //         console.log(error['errors']);
  //         return callback(error);
  //       }
  //       cache = db;
  //       createmanufacturer(db, manufacturer, callback);
  //     });
  //   } else {
  //     createmanufacturer(cache, manufacturer, callback);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return callback(error);
  // }
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
