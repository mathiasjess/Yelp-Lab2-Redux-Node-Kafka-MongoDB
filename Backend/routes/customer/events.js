const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/customerpassport')


router.get('/fetchEvents',checkAuth, function(req,res) {
    kafka.make_request('fetchEvents','events',function (err, results) {
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


router.post('/registerForEvent',checkAuth, function (req, res) {
    let returnObject = {};
    console.log(req.body.eventId)
    let addRegistry = {
        restaurantId: req.body.restaurantId,
        eventId: req.body.eventId,
        customerID: req.body.customerId,
        customerName: req.body.customerName
    }
    console.log("Add dish", addRegistry)
    kafka.make_request('registerforevents',addRegistry,function (err, results) {
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

router.get('/fetchSingleEvent/:value',checkAuth, function(req,res) {
    let returnObject = {}
    restaurant.find({'events.eventName': req.params.value },{'events.$': 1, _id:0},(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })
})

router.get('/fetchcustomerEvent/:id', checkAuth, function(req,res) {
    let returnObject = {}
    kafka.make_request('fetchcustomerevents',req.params.id,function (err, results) {
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

module.exports = router;