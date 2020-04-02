'use strict';
var express = require('express');
var app = express();
global.__root = __dirname + '/';
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', function (req, res) {
	res.status(200).send('API works.');
});

var UserController = require(__root + 'controllers/appUsersController');
app.use('/api/users', UserController);

var TaskController = require(__root + 'controllers/appTaskController');
app.use('/api/tasks', TaskController);

module.exports = app;