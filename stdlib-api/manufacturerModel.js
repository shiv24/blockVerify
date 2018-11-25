var mongoose = require('mongoose');
// Setup schema
var manufacturerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    public_token: {
        type: String,
        required: true,
        unique: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Manufacturer = module.exports = mongoose.model('manufacturer', manufacturerSchema);
module.exports.get = function (callback, limit) {
    Manufacturer.find(callback).limit(limit);
}