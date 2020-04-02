'use strict';
var sql = require('../configurations/config');
const bcrypt = require('bcryptjs');


/** 
 * @user User object when passed into the constructor
 * Sets the user properties
 */

var User = function (user) {
    this.username = user.username;
    this.fullname = user.fullname;
    this.email = user.email;
    this.password = user.password;
    this.image = user.image;
    this.ID = user.ID;
};


/**
 * Function to create or register the user 
 * @newUser New User object with all the properties to be saved into the DB
 * @result returns the User ID
 */

User.createUser = function (newUser, result) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            sql.CONNECTION.query("INSERT INTO tbl_user set ?", newUser, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, res.insertId);
                }
            });
        });
    });

};

/**
 * Function to fetch the user by ID
 * @userId PK of the User to be fetched
 * @result returns the User result set or the user object
 */

User.getUserById = function (userId, result) {
    sql.CONNECTION.query("Select * from tbl_user where id = ? ", [userId], function (err, res) {
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


User.getUserByEmail = function (email, result) {
    sql.CONNECTION.query("Select * from tbl_user where email = ? ", [email], function (err, res) {
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



User.getUserByUserName = function (username, result) {
    sql.CONNECTION.query("Select * from tbl_user where username = ? ", [username], function (err, res) {
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


User.getAllUsers = function (result) {
    sql.CONNECTION.query("Select * from tbl_user", function (err, res) {

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

User.updateById = function (user, result) {
    sql.CONNECTION.query("UPDATE tbl_user SET fullname = ?, email = ?, image = ? WHERE id = ?",
        [user.fullname, user.email, user.image,user.id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};

User.remove = function (id, result) {
    sql.CONNECTION.query("DELETE FROM tbl_user WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

User.comparePassword = function (password, userId, result) {
    console.log(userId);
    sql.CONNECTION.query("SELECT password FROM tbl_user WHERE id = ?", [userId], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(null, err);
        } else {
            console.log(res[0]);
            var hash = res[0].password;
            bcrypt.compare(password, hash, (err, isMatch) => {
                if (err) throw err;
                result(null, isMatch);
            });
        }
    });

};
module.exports = User;