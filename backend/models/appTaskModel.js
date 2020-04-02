'use strict';
var sql = require('../configurations/config');

var Task = function (task) {
    this.task = task.task;
    this.taskdetails = task.taskdetails;
    this.taskstatus = task.taskstatus;
    this.isdeleted = task.isdeleted;
    this.iscompleted = task.iscompleted;
    this.userid = task.userid;
};

Task.createTask = function (task, result) {
    sql.CONNECTION.query("INSERT INTO tbl_task set ?", task, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Task.getTaskByID = function (taskID, userID, result) {
    sql.CONNECTION.query("Select * from tbl_task where id = ? AND userid = ? ", [taskID, userID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res[0]);
            result(null, res[0]);

        }
    });
};

Task.updateTaskToComplete = function (taskID, result) {
    sql.CONNECTION.query("UPDATE tbl_task SET iscompleted = ? WHERE id = ?",
        [true, taskID], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};

Task.updateTaskStatus = function (status, result) {
    sql.CONNECTION.query("UPDATE tbl_task SET taskstatus = ? WHERE id = ?",
        [true, status], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};


Task.updateTask = function (task, result) {
    console.log(task);
    sql.CONNECTION.query("UPDATE tbl_task SET task = ?,taskdetails=? WHERE id = ?",
        [task.task,task.taskdetails, task.id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};

Task.remove = function (taskID, result) {
    sql.CONNECTION.query("UPDATE tbl_task SET isdeleted = ? WHERE id = ?", [true, taskID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


Task.getAllTasksForUser = function (userID, result) {
    sql.CONNECTION.query("Select * from tbl_task WHERE userid=? AND isdeleted IS NULL", [userID], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};

Task.getAllStatus = function (result) {
    sql.CONNECTION.query("Select * from tbl_taskstatus", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
module.exports = Task;