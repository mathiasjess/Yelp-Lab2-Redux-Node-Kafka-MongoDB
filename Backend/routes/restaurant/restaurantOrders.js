var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//Router to handle get request for orders summary
router.get('/restaurantordersummary/:id', function(req,res) {
    let returnObject = {}
    console.log("Inside restaurant Order Summary");
    restaurant.findById(req.params.id, { 'orders': 1, _id: 0 }, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Menu Data", returnObject)
        }
    })
})

//Router to handle updating order status
router.put('/updateorderstatus', function (req, res) {
    let returnObject = {};
    console.log("Req body", req.body)
    restaurant.updateOne({ 'orders._id': req.body.orderID },
        {
            '$set': {
                'orders.$.delivery_status': req.body.delivery_status,
                'orders.$.deliveryFilter': req.body.deliveryFilter
            }
        }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                console.log(result)
                res.json(returnObject);
            }
        });
});

//Router to handle cancelling order 
router.put('/cancelorder',function (req, res) {
    let returnObject = {};
    restaurant.updateOne({ 'orders._id': req.body.orderID },
        {
            '$set': {
                'orders.$.delivery_status': req.body.delivery_status,
                'orders.$.deliveryFilter': req.body.deliveryFilter
            }
        }, (err, result) => {
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