// Api routes
module.exports = function (app) {
    const appController = require('../controller/appController');

    // Routes
    app.get('/', function (req, res) {
        res.json('Server connected');
    });

    app.post('/register', appController.register);

    app.post('/login', appController.login);

    app.get('/list', appController.list);

    app.post('/update', appController.register);

    app.delete('/delete', appController.list);
};