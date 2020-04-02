'use strict';
var express = require('express');
var app = express();
global.__root = __dirname + '/';
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const corsConfig = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};
app.use(corsConfig);

app.get('/api', function (req, res) {
	res.status(200).send('API works.');
});

var UserController = require(__root + 'controllers/appUsersController');
app.use('/api/users', UserController);

var TaskController = require(__root + 'controllers/appTaskController');
app.use('/api/tasks', TaskController);

module.exports = app;