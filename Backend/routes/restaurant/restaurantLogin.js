var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Route to handle Post Request Call to update basic Restaurant Information
router.post('/restaurantlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    new Promise((resolve, reject) => {
        restaurant.find({ email: email }, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                res.json(returnObject);
            }
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
                        returnObject.message = "successfully logged in";
                        returnObject.data = value[1]
                    }
                    else {
                        returnObject.message = "Invalid credentials"
                    }
                    res.json(returnObject)
                })
        })
});

module.exports = router;