var express = require('express');
var router = express.Router();
const Chat = require('../../models/ChatModel')
const kafka = require('../../kafka/client');
const { checkAuth } = require('../../utils/restaurantpassport');

//Get Chats from the database

//Router to get conversations
router.get('/getchats',checkAuth,function (req, res) {
    console.log("Inside converstaions");
    let returnObject = {};
    console.log("ID", req.params.id);
    let chatquery = {
        restaurantId: req.query[0],
        customerId : req.query[1]
    }
    kafka.make_request('getchats',checkAuth, chatquery, function (err, results) {
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

//Router to get conversations for restaurant
router.get('/getrestaurantconversations/:id', checkAuth,function (req, res) {
    console.log("Inside restaurant conversations");
    let returnObject = {};
    console.log("ID", req.params.id);
    kafka.make_request('getrestaurantconversations', req.params.id, function (err, results) {
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

//Router to get conversations for customer
router.get('/getcustomerconversations/:id',checkAuth, function (req, res) {
    console.log("Inside customer conversations");
    let returnObject = {};
    console.log("ID", req.params.id);
    kafka.make_request('getcustomerconversations', req.params.id, function (err, results) {
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