// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var manufacturerController = require('./manufacturerController');
// Contact routes
router.route('/manufacturers')
    .get(manufacturerController.index)
    .post(manufacturerController.new);
router.route('/manufacturers/:manufacturer_id')
    .get(manufacturerController.view)
    .patch(manufacturerController.update)
    .put(manufacturerController.update)
    .delete(manufacturerController.delete);
// Export API routes
module.exports = router;