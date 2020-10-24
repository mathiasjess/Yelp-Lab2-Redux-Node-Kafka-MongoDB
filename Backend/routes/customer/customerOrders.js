const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//Router to handle post request to add dishes to Menu
router.post('/sendorderdetails', function (req, res) {
    console.log("Restaurant ID", req.body.restaurantID)
    let returnObject = {};
    let ordersObject = {
        customerID: req.body.customerID,
        customerName : req.body.customerName,
        customerImage : req.body.customerImage,
        totalPrice: req.body.total_price,
        deliveryOption: req.body.delivery_option,
        delivery_status: req.body.delivery_status,
        deliveryFilter: req.body.deliveryFilter,
        orderDetails: req.body.orderDetails
    }
    console.log("Add dish",ordersObject)
    restaurant.updateOne(
        { _id: req.body.restaurantID }, { $push:{orders: ordersObject}}, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                res.json(returnObject)
            }
        });
});

//Fetch order details for a particular customer
router.get('/fetchcustomerordersummary/:id', function (req, res) {
    console.log("Inside Customer Order History");
    let returnObject = {};
    console.log("ID", req.params.id);
    restaurant.find({'orders.customerID':req.params.id},{ _id : 0, 'restaurantName': 1, 'restaurantImage':1,'orders._id':1, 'orders.totalPrice':1,'orders.deliveryOption':1,'orders.delivery_status':1,
    'orders.deliveryFilter':1, 'orders.orderDetails':1}, (err, result) => {
        // restaurant.find({'orders.customerID':req.params.id},{ _id : 0, 'orders': 1}, (err, result) => {

            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
                console.log(returnObject.data)
            }
        })

})

module.exports = router