const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./app/config/db');

//Init app
const app = express();


app.use(expressValidator());

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

let routes = require('./app/routes/appRoutes'); //importing route
routes(app);

port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

