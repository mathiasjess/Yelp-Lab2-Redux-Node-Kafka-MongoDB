var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

//Router to handle get request for orders summary
router.get('/restaurantordersummary/:id', function(req,res) {
    let returnObject = {}
    let sql1 = "SELECT customer.profileImage, customer.firstName, customer.lastName,ordersummary.customerId, ordersummary.orderID, ordersummary.totalPrice, ordersummary.deliveryOption, ordersummary.delivery_status, ordersummary.deliveryFilter, ordersummary.Date FROM customer, ordersummary where customer.id = ordersummary.customerId and ordersummary.restaurantId = " + req.params.id + "";
    console.log(sql1)
    mysqlConnection.query(sql1,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log('ordersummary',returnObject)
        }
    })
})

//Router to handle get request for order details
router.get('/fetchrestaurantorderdetails/:id', function(req,res) {
    let returnObject = {}
    let sql2 = "select * from orderdetails where orderID in (SELECT orderID from ordersummary where restaurantId = " + req.params.id + ")";
    console.log(sql2)
    mysqlConnection.query(sql2,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("order details", returnObject)
        }
    })
})

//Router to handle get request for orders summary
router.get('/individualrestaurantordersummary/:id', function(req,res) {
    let returnObject = {}
    let sql3 = "SELECT restaurant.restaurantImage, restaurant.restaurantName, customer.profileImage, customer.firstName, customer.lastName,ordersummary.customerId, ordersummary.orderID, ordersummary.totalPrice, ordersummary.deliveryOption, ordersummary.delivery_status, ordersummary.deliveryFilter, ordersummary.Date FROM restaurant, customer, ordersummary where restaurant.restaurantId = ordersummary.restaurantId and customer.id = ordersummary.customerId and ordersummary.orderID = " + req.params.id + "";
    console.log(sql3)
    mysqlConnection.query(sql3,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log('ordersummary',returnObject)
        }
    })
})

//Router to handle get request for order details
router.get('/individualfetchrestaurantorderdetails/:id', function(req,res) {
    let returnObject = {}
    let sql4 = "select * from orderdetails where orderID  = " + req.params.id + "";
    console.log(sql4)
    mysqlConnection.query(sql4,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("order details", returnObject)
        }
    })
})

//Router to handle updating order status
router.put('/updateorderstatus',function (req, res) {
    let returnObject = {};
    var sql5 = "update ordersummary set delivery_status ='" + req.body.delivery_status
    + "',deliveryFilter ='" + req.body.deliveryFilter
    + "' where orderID ='" + req.body.orderID + "'";
        console.log(sql5)
    mysqlConnection.query(sql5, (err, result) => {
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
});

//Router to handle cancelling order 
router.put('/cancelorder',function (req, res) {
    let returnObject = {};
        var sql6 = "update ordersummary set delivery_status ='" + req.body.delivery_status
        + "',deliveryFilter ='" + req.body.deliveryFilter
        + "' where orderID= " + req.body.orderID + "";
        console.log(sql6);
    mysqlConnection.query(sql6, (err, result) => {
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
});

module.exports = router;