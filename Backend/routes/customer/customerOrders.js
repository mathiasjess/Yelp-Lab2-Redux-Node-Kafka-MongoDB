const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/customerpassport')

//Router to handle post request to add dishes to Menu
router.post('/sendorderdetails', function (req, res) {
    console.log("Restaurant ID", req.body.restaurantId)
    // let ordersObject = {
    //     restaurantId : req.body.restaurantID,
    //     customerID: req.body.customerID,
    //     customerName : req.body.customerName,
    //     customerImage : req.body.customerImage,
    //     totalPrice: req.body.total_price,
    //     deliveryOption: req.body.delivery_option,
    //     delivery_status: req.body.delivery_status,
    //     deliveryFilter: req.body.deliveryFilter,
    //     orderDetails: req.body.orderDetails
    // }
    // console.log("Orders",ordersObject)
    kafka.make_request('sendorderdetails', req.body, function (err, results) {
        console.log(req.body);
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
});

//Fetch order details for a particular customer
router.get('/fetchcustomerordersummary/:id',function (req, res) {
    console.log("Inside Customer Order History");
    let returnObject = {};
    kafka.make_request('fetchordersummary', req.params.id, function (err, results) {
        console.log(req.body);
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

module.exports = router