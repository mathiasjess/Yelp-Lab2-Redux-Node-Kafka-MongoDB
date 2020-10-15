var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

router.post('/sendorderdetails/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside send order details");
    console.log("Req body", req.body)
    mysqlConnection.query(
        'INSERT INTO orderdetails (orderID, itemID,dishName,price, quantity) VALUES ?',
        [req.body.map(item => [req.params.id, item.itemID, item.dishName, item.price, item.quantity])],
        (err, results) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = results
                res.json(returnObject)
            }
        }
    );
})

router.post('/sendordersummary', function (req, res) {
    let orderID = Math.floor(Math.random() * 10000) + 1;  
    let returnObject = {};
    console.log(orderID)
    console.log("Inside Order summary details");
    let sql1 = "INSERT INTO ordersummary (orderID, restaurantId, customerId, totalPrice, deliveryOption, delivery_status, deliveryFilter) VALUES (" + orderID
        + "," + req.body.restaurantID
        + "," + req.body.customerID
        + "," + req.body.total_price
        + ",'" + req.body.delivery_option
        + "','" + req.body.delivery_status
        + "','" + req.body.deliveryFilter + "' )";
        mysqlConnection.query(sql1,(err, results) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = orderID
                res.json(returnObject)
            }
        })
})

//Router to handle get request for orders summary
router.get('/fetchcustomerordersummary/:id', function(req,res) {
    let returnObject = {}
    let sql2 = "SELECT restaurant.restaurantName,ordersummary.orderID, ordersummary.totalPrice, ordersummary.deliveryOption, ordersummary.delivery_status, ordersummary.deliveryFilter, ordersummary.Date FROM restaurant, ordersummary where restaurant.restaurantId = ordersummary.restaurantId and ordersummary.customerId = " + req.params.id + "";
    console.log(sql2)
    mysqlConnection.query(sql2,(err,result)=>{
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
router.get('/fetchcustomerorderdetails/:id', function(req,res) {
    let returnObject = {}
    let sql3 = "select * from orderdetails where orderID in (SELECT orderID from ordersummary where customerId = " + req.params.id + ")";
    console.log(sql3)
    mysqlConnection.query(sql3,(err,result)=>{
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

module.exports = router;