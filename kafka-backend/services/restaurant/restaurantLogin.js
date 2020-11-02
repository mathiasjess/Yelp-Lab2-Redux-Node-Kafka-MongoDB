var express = require('express');
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
const jwt = require('jsonwebtoken')
const {secret} = require('../../../Backend/utils/config')
var bcrypt = require('bcryptjs');
const saltRounds = 10;
require('../../../Backend/mongoose')

//Route to handle Post Request Call to update basic Restaurant Information
function handle_request(msg, callback){
    let returnObject = {};
    let loginresult = null;
    email = msg.email
    password = msg.password
    new Promise((resolve, reject) => {
        restaurant.find({ email: email }, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                // returnObject.message = "nouser";
                // res.json(returnObject);
                callback(error, {message: "nouser"});
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
                        const payload = {_id: loginresult._id, email:loginresult.email, role:'restaurant', name: loginresult.restaurantName};
                        console.log(payload)
                        const token = jwt.sign(payload, secret, {
                            expiresIn : 1008000
                        });
                        returnObject.message = "success";
                        returnObject.data = value[1]
                        returnObject.token = "JWT "+ token
                        // res.status(200).end("JWT "+ token)
                    }
                    else {
                        returnObject.message = "Invalid credentials"
                        // res.status(401).end("Invalid credentials")
                    }
                    // res.json(returnObject)
                    callback(null, returnObject)

                })
        })
}

exports.handle_request = handle_request
