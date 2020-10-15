var express = require('express');
var router = express.Router();
var mysqlConnection = require('../models/index')
var Users = [{
    username: "",
    email: "",
    password: ""
}]

//Route to handle Post Request Call for customer Registration
router.post('/customerregister', function (req, res) {
    username = req.body.username
    email = req.body.email
    password = req.body.password
    console.log(username)
    console.log(email)
    console.log(password)
    var sql1 =  "insert into customer (username, email, password) values ('" + username + "', '" + email + "', '" + password + "')";
    mysqlConnection.query(sql1, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
    });
    // let createFlag = 0
    // console.log("Inside Customer Registration Post Request");
    // console.log("Req Body : ", req.body);
    // Users.map((user) => {
    //     if (user.email === req.body.email) {
    //         createFlag = 1
    //         return;
    //     }
    // })
    // if (createFlag == 0) {
    //     Users.push(req.body)
    //     console.log("After pushing", Users)
    //     // res.writeHead(200,{
    //     //     'Content-Type' : 'text/plain' 
    //     // })
    //     res.status(200).send({ msg: "Successfully registered a user" })
    // }
    // else {
    //     return res.status(400).send({ msg: 'Email already exists. Please login if existing user' });
    // }


});

//Route to handle Post Request Call for customer Login
router.post('/customerlogin', function (req, res) {
    let returnObj = {};
    email = req.body.email
    password = req.body.password
    console.log(email)
    console.log(password)
    var sql2 =  "select id from  customer where email = '" + email + "' and  password = '" + password + "'";
    mysqlConnection.query(sql2, function (error, result) {
        if(!result[0]){
            returnObj.message = "nouser";
            console.log('Invalid user');
            res.json(returnObj);
        }
        else{
            res.status(200).send({ msg: "Successfully logged in" })
            console.log("Success login")
        }
    });
    // if (loginFlag == 0) {
    //     return res.status(400).send({ msg: 'Invalid Credentials' });
    // }

});


module.exports = router;