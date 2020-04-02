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
router.post("/createtask", function (req, res) {
    var new_task = new Task(req.body);
    //var userId = new UserTokenModel(JSON.parse(req.userId));
    //console.log(userId);
    new_task.userid = 1;
    //handles null error 
    if (!new_task.taskstatus) {
        res.status(400).send({ error: true, message: 'Please provide a status for task' });
    }
    else {
        Task.createTask(new_task, function (err, task) {
            if (err) res.send(err);
            res.json(task);
        });
    }
});


router.get('/taskList', function (req, res) {
    Task.getAllTasksForUser(1, function (err, tasks) {
        if (err)
            res.send(err);
        console.log('res', tasks);
        res.send(tasks);
    });
});

router.put('/updateTaskToComplete/:id', function (req, res) {
    const { id } = req.params;
    const task = { task: req.body.task, taskdetails: req.body.taskdetails };
    Task.updateTaskToComplete(id, function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
});



router.put('/updateTask/:id', function (req, res) {
    const { id } = req.params;
    const task = { task: req.body.task, taskdetails: req.body.taskdetails, id: id };
    console.log(task);
    Task.updateTask(task, function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
});


router.delete('/deleteTask/:id', function (req, res) {
    const { id } = req.params;
    Task.remove(id, function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
});

module.exports = router;