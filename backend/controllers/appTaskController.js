'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../configurations/token');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Task = require('../models/appTaskModel');
var UserTokenModel = function (tokenVal) {
    this.UserID = tokenVal.id;
    this.iat = tokenVal.iat;
    this.expiry = tokenVal.exp;
};
router.post("/createtask", VerifyToken, function (req, res) {
    var new_task = new Task(req.body);
    var userId = new UserTokenModel(JSON.parse(req.userId));
    console.log(userId);
    new_task.userid = userId;
    //handles null error 
    if (!new_task.taskstatus) {
        res.status(400).send({ error: true, message: 'Please provide a status for task' });
    }
    else {
        Task.createTask(new_user, function (err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    }
});

module.exports = router;