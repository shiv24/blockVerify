var mongoose = require('mongoose');
// const MongoClient = mongodb.MongoClient;

let cache = null;

const async = require('async')

/**
* @returns {array}
*/
module.exports = (context, callback) => {

  let uri = process.env['MONGO_URI'];
  mongoose.connect(uri);

  mongoose.Promise = global.Promise;
  var db = mongoose.connection;

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

  var Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

  Manufacturer.find({}, function(error, data) {
    console.log(data); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
    return callback(null, JSON.parse(JSON.stringify(data)));
  });

  // let uri = process.env['MONGO_URI'];

  // try {
  //   if (cache === null) {
  //     MongoClient.connect(uri, (error, db) => {
  //       if (error) {
  //         console.log(error['errors']);
  //         return callback(error);
  //       }
  //       cache = db;
  //       readManufacturers(db, callback);
  //     });
  //   } else {
  //     readManufacturers(cache, callback);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return callback(error);
  // }
};

const readManufacturers = function(db, callback) {
  let cursor = db.collection('manufacturers').find();
  let manufacturers = [];
  async.each(manufacturers, function(data, next) {
      var itemData = {
        id: next._id,
        name: next.name,
        public_token: next.public_token
      }
      manufacturers.push(itemData);
      next();
  });
  // cursor.each((error, item) => {
  //   if (error) {
  //     return;
  //   }
  //   if (item == null) {
  //     return;
  //   }
  //   var data = {
  //     id: item._id,
  //     name: item.name,
  //     public_token: item.public_token
  //   }

  //   manufacturers.push(data);
  // });
  return callback(null, {data: manufacturers});
};