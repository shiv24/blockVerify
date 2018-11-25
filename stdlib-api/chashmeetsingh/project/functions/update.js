var mongoose = require('mongoose');

let cache = null;

/**
* @param {string} name
* @param {string} public_token
* @returns {any}
*/
module.exports = (name, public_token, context, callback) => {

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

  const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

  var manu = Manufacturer
    .findOne({ public_token: context.params.public_token })
    .exec()
    .then((manufacturer) => {
      manufacturer.name = context.params.name;
    })

  // Manufacturer.update({name: context.params.name}, {public_token: context.params.public_token}, {upsert: true}, function(err) {
  //   console.log(err);
  // });



  // let uri = process.env['MONGO_URI'];
  // ids = ids.map(id => new mongodb.ObjectID(id));

  // try {
  //   if (cache === null) {
  //     MongoClient.connect(uri, (error, db) => {
  //       if (error) {
  //         console.log(error['errors']);
  //         return callback(error);
  //       }
  //       cache = db;
  //       updateManufacturer(db, ids, callback);
  //     });
  //   } else {
  //     updateManufacturer(cache, ids, callback);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return callback(error);
  // }
};

// const updateManufacturer = (db, ids, callback) => {
//   try {
//     db
//     .collection('manufacturers')
//     .updateMany(
//       { _id: { $in: ids } },
//       (error, result) => {
//         if (error) {
//           console.log(error);
//           return callback(null, error);
//         }
//         return callback(null, result);
//       }
//     );
//   } catch(err) {
//     console.log(err);
//   }
  
// };
