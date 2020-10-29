var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')
const jwt = require('jsonwebtoken')
const {secret} = require('../../utils/config')

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Route to handle Post Request Call for customer Registration

router.post('/customerlogin', function (req, res) {
    let returnObject = {};
    let loginresult = null;
    email = req.body.email
    password = req.body.password
    new Promise((resolve, reject) => {
        customer.find({ email: email }, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                res.json(returnObject);
            }
            loginresult = result[0]
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    if (err) throw err;
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    if (value[0]) {
                        const payload = {_id: loginresult._id, email:loginresult.email, role:'customer'};
                        console.log(payload)
                        const token = jwt.sign(payload, secret, {
                            expiresIn : 1008000
                        });
                        returnObject.message = "success";
                        returnObject.data = value[1]
                        returnObject.token = "JWT "+ token
                        returnObject.firstName = loginresult.firstName
                        returnObject.lastName = loginresult.lastName
                        returnObject.zipcode = loginresult.zipcode
                        // res.status(200).end("JWT "+ token)
                    }
                    else {
                        returnObject.message = "Invalid credentials"
                    }
                    res.json(returnObject)
                })
        })
});

module.exports = router;