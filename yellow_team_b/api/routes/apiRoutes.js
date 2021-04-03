'use strict';
module.exports = function(app) {
    var controller = require('../controllers/apiController');

    // todoList Routes
    app.route('/members')
        .get(controller.authenticateJWT, controller.list_all_members);


    app.route('/poem')
        .get(controller.authenticateJWT, controller.read_a_poem);

    app.route('/auth')
        .post(controller.authorize);
};