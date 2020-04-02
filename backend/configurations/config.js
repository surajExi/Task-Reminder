'use strict';
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reminder_db'
});

connection.connect(function (err) {
    if (err) throw err;
    else console.log("Connected Successfully");
});


var secret = "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lJdllYQnBMeUlzSW1saGRDSTZNVFUyTWpJMk56ZzFOU3dpWlhod0lqb3hOVGt6T0RBek9EVTFMQ0poZFdRaU9pSXFLaW9xS2lvaUxDSnpkV0lpT2lJaWZRLlBtWkc0OVQyc3lSR0pxV040emdVdWJGUnE1UGg5dVQzNHVoa281MkpuNGc=";
var refreshToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjI4YTBiZWRmLTY4M2QtNGQzZi04MDUwLTkzY2E4YmJmMmJlYyIsImlhdCI6MTU4NTMzNDI2MSwiZXhwIjoxNTg1MzM3ODYxfQ.87Oh-m_MFmY9zYt8RfnS39iOJCwJ_-kyr9fYCrKBvyY";
module.exports.CONNECTION = connection;
module.exports.SECRET = secret;
module.exports.REFRESH_TOKEN = refreshToken;