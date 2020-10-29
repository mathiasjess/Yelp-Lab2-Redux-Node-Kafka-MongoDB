const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')


router.get('/fetchEvents', function(req,res) {
    let returnObject = {}
        // restaurant.distinct('$events._id', {},{}, (err, result)=>{
    restaurant.aggregate([
        // {$bucket:{
        //     groupBy: "$events._id", 
        //     output: {
        //     // restaurantName : 'restaurantName',
        //     // restaurantImage: 'restaurantImage',
        //     "eventID": "$events._id",
        //     "eventName":"$events.eventName"
        //     } 
        // }}
        // {$unwind : "$events"},
        {$project : {_id : 1,
            restaurantName : 1,
            restaurantImage: 1,
            events: '$events'}},
            // eventId : "$events._id",
            // eventName : "$events.eventName",
            // eventDescription : "$events.eventDescription ",
            // eventTime: "$events.eventTime",
            // eventDate : "$events.eventDate",
            // eventLocation: "$events.eventLocation",
            // eventHashtag : "$events.eventHashtag"}}
    ],(err,result)=>{
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


router.post('/registerForEvent', function (req, res) {
    let returnObject = {};
    console.log(req.body.eventId)
    let addRegistry = {
        customerID: req.body.customerId,
        customerName: req.body.customerName
    }
    console.log("Add dish", addRegistry)

    restaurant.update(
        {_id: req.body.restaurantId, 'events._id': req.body.eventId }, {$push : {'events.$.registeredUsers' : addRegistry}}, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                res.json(returnObject);
            }
        });
})

router.get('/fetchSingleEvent/:value', function(req,res) {
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

router.get('/fetchcustomerEvent/:id', function(req,res) {
    let returnObject = {}
        restaurant.aggregate([
            {$unwind: '$events'},
            {$match : {"events": {"registerdUsers":{"$customerID": req.params.id}}}},
            {$project : {_id : 0, 
                eventId : "$events._id",
                eventName : "$events.eventName",
                eventDescription : "$events.eventDescription ",
                eventTime: "$events.eventTime",
                eventDate : "$events.eventDate",
                eventLocation: "$events.eventLocation",
                eventHashtag : "$events.eventHashtag"}}

        ],(err,result)=>{
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

module.exports = router;