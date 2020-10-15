var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Route to handle Post Request Call for customer Registration
router.post('/customerregister', function (req, res) {
    let returnObject = {};
    username = req.body.username
    email = req.body.email
    password = req.body.password
    yelpingSince = new Date()
   


    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, encrypted) => {
                if (err) throw err;
                resolve(encrypted)
            })
        })
    })
        .then((value) => {
            let sql1 = "insert into customer (username, email, password, yelpingSince) values ('" + username + "', '" + email + "', '" + value + "', '" + yelpingSince + "')";
            mysqlConnection.query(sql1, function (error, rows) {
                if (error) {
                    returnObject.message = "error";
                    returnObject.data = []
                    res.json(returnObject);
                }
                else {
                    returnObject.message = "Registered Successfully";
                    returnObject.data = rows[0]
                    res.json(returnObject);
                    console.log("Registered Successfully", returnObject)
                }
            });
        })

});

//Route to handle Post Request Call for customer login
router.post('/customerlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    var sql2 = "select * from  customer where email = '" + email + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                console.log('Invalid user');
                res.json(returnObject);
            }
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    if (err) throw err;
                    console.log("Password matched")
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    if (value[0]) {
                        returnObject.message = "success";
                        returnObject.data = value[1]
                    }
                    else {
                        console.log("Invalid credentials")
                        returnObject.message = "error"
                    }
                    res.json(returnObject)
                    console.log("Successfully Logged in", returnObject)
                })
        })
});

module.exports = router;
