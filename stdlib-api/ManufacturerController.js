Manufacturer = require('./manufacturerModel');
// Handle index actions
exports.index = function (req, res) {
    Manufacturer.get(function (err, manufacturers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Manufacturer retrieved successfully",
            data: manufacturers
        });
    });
};

// Handle create manufacturer actions
exports.new = function (req, res) {
    var manufacturer = new Manufacturer();
    manufacturer.name = req.body.name ? req.body.name : manufacturer.name;
    manufacturer.public_token = req.body.public_token;
    
// save the contact and check for errors
    manufacturer.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New manufacturer created!',
            data: manufacturer
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Manufacturer.findById(req.params.manufacturer_id, function (err, manufacturer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Manufacturer details loading..',
            data: manufacturer
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
Manufacturer.findById(req.params.manufacturer_id, function (err, manufacturer) {
        if (err)
            res.send(err);
        manufacturer.name = req.body.name ? req.body.name : manufacturer.name;
        manufacturer.public_token = req.body.public_token;
        
// save the contact and check for errors
        manufacturer.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Manufacturer Info updated',
                data: manufacturer
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Manufacturer.remove({
        _id: req.params.manufacturer_id
    }, function (err, manufacturer) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Manufacturer deleted'
        });
    });
};