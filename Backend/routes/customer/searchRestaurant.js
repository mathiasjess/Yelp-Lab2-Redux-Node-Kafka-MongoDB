var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/customerpassport')

//Router to handle get request to search restaurants
router.get('/searchforrestaurant',checkAuth, function (req, res) {
    let returnObject = {};
    let param1 = req.query[0]
    console.log("Params",req.query[0])
    kafka.make_request('searchrestaurant',req.query[0], function (err, results) {
        console.log('in result');
        console.log(results);
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
})

// Router to handle get request to fetch dishes
router.get('/restaurantprofiledetails/:id', checkAuth, function (req, res) {
    let returnObject = {};
    console.log("Inside restaurant profile");
    kafka.make_request('restaurantprofiledetails', req.params.id, function (err, results) {
        console.log('In result');
        console.log(results);
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
    });
})
module.exports = router;
