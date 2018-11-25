var mongoose = require('mongoose');

// const lib = require('lib')({
//   token: "dHt4CvlcklSlvHVxLheuTA9_I-4CdgPefKHhXWO0t1koJv1sVe8wlQUmWK7hdvNs"
// });

let cache = null;

// const utils = lib.utils({
//   service: 'manufacturer'
// });

/**
* @param {string} public_token
* @returns {any}
*/
module.exports = (public_token, context, callback) => {
  
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
  .remove()
  .exec((some) => {
    return callback(null, {
      'message': 'success'
    });
  });

  // ids = ids.map(id => new mongodb.ObjectID(id));

  // try {
  //   if (cache === null) {
  //     MongoClient.connect(uri, (error, db) => {
  //       if (error) {
  //         console.log(error['errors']);
  //         return callback(error);
  //       }
  //       cache = db;
  //       destroyManufacturer(db, id, callback);
  //     });
  //   } else {
  //     destroyManufacturer(cache, id, callback);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return callback(error);
  // }
};

const destroyManufacturer = (db, id, callback) => {
  db.collection('manufacturers').deleteOne({ _id: id }, (error, results) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    console.log(results);
    return callback(null, {
      "message": "success"
    });
  });
};