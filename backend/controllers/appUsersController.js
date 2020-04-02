'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../configurations/token');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/appUserModel');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../configurations/config'); // get config file
let refreshTokens = [];
var UserTokenModel = function (tokenVal) {
	this.UserID = tokenVal.id;
	this.iat = tokenVal.iat;
	this.expiry = tokenVal.exp;
};
var UserAuthModel = function (auth) {
	this.username = auth.username;
	this.password = auth.password;
};

router.post('/login', function (req, res) {
	console.log(req.body);
	var auth = new UserAuthModel(req.body);
	const userName = auth.username;
	const password = auth.password;

	User.getUserByUserName(userName, function (err, user) {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User Not Found' });
		}
		console.log("User found " + password);
		var userID = user.ID;
		console.log(userID);
		User.comparePassword(password, userID, function (err, isMatch) {
			console.log("User Id" + userID);
			if (err) throw err;
			if (isMatch) {
				console.log(config.SECRET);
				const token = generateAccessToken(user.ID);
				const refreshToken = jwt.sign(user.ID, config.REFRESH_TOKEN);
				refreshTokens.push(refreshToken);
				res.json({
					success: true,
					token: token,
					refreshToken: refreshToken,
					user: {
						id: user.id,
						name: user.f_name + ' ' + user.l_name,
						email: user.email,
						mobile: user.mobile
					}
				});				
			} else {
				return res.json({ success: false, msg: "Password is wrong" });
			}
		});
	});

});

router.post('/token', function (req, res) {
	const refreshToken = req.body.token;
	if (refreshToken === null) return res.sendStatus(401);
	console.log(refreshTokens);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(refreshToken, config.REFRESH_TOKEN, function (err, user) {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken(user);
		res.json({ accessToken: accessToken });
	});
});


router.get('/logout', function (req, res) {
	console.log(req.userId);
	req.userId = {};
	console.log(req.userId);
	res.status(200).send({ auth: false, token: null });
});

router.post('/register', function (req, res) {
	var new_user = new User(req.body);
	//handles null error 
	if (!new_user.email) {
		res.status(400).send({ error: true, message: 'Please provide an email for user' });
	}
	else {
		User.createUser(new_user, function (err, user) {
			if (err) res.send(err);
			res.json(user);
		});
	}

});

router.get('/userList', VerifyToken, function (req, res) {
	console.log(req.userId);
	User.getAllUsers(function (err, user) {
		if (err)
			res.send(err);
		console.log('res', user);
		res.send(user);
	});
});

router.get('/me', VerifyToken, function (req, res, next) {
	console.log(JSON.parse(req.userId));
	var userId = new UserTokenModel(JSON.parse(req.userId));
	console.log(userId);
	User.getUserById(userId.UserID, function (err, user) {
		if (err)
			res.send(err);
		console.log('res', user);
		res.send(user);
	});
});

function generateAccessToken(userId) {
	return jwt.sign({ id: userId }, config.SECRET, {
		expiresIn: 15
	});
}

module.exports = router;