var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')
const jwt = require('jsonwebtoken')
const {secret} = require('../../utils/config')
const { auth } = require("../../utils/restaurantpassport");
auth();
// var bcrypt = require('bcrypt');
// const saltRounds = 10;

//Route to handle Post Request Call to update basic Restaurant Information
router.post('/restaurantlogin', function (req, res) {
    kafka.make_request('restaurantlogin', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log("Login results",results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    })
});

module.exports = router;