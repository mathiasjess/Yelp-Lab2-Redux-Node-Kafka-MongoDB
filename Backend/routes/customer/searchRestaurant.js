var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//Router to handle get request to search restaurants
router.get('/searchforrestaurant', function (req, res) {
    let returnObject = {};
    let param1 = req.query[0]
    console.log("Params",req.query[0])

    // let param2 = req.query[1]
    if (param1 === 'Curb Pickup') {
        restaurant.find({ curbPickup: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                res.json(returnObject)
            }
        });
    }
    else if (param1 === 'Dine In') {
        restaurant.find({ dineIn: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                res.json(returnObject)
            }
        });
    }
    else if (param1 === 'Yelp Delivery') {
        restaurant.find({ yelpDelivery: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                res.json(returnObject)
            }
        });
    }
    else {
        restaurant.find({
            "$or": [{
                // 'restaurantName': { $regex: '/.*' + param1 + '.*/' }
                'restaurantName': param1
            }]
            // {
            //     "cusine": { $regex: '/.*' + param1 + '.*/' }
            // },
            // {
            //     "location": { $regex: '/.*' + param1 + '.*/' }
            // },
            // {
            //     "city": { $regex: '/.*' + param1 + '.*/' }
            // },
            // {
            //     "zipcode": { $regex: '/.*' + param1 + '.*/' }
            // },
            // {
            //     "zipcode": { $regex: '/.*' + param1 + '.*/' }
            // },
            // {
            //     "menuItem.dishName": { $regex: '/.*' + param1 + '.*/' }
            // }]
        }, (err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
            }
        })
    }

})
module.exports = router;
