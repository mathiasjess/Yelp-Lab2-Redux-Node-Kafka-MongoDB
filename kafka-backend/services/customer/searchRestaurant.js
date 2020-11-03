require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

//Router to handle get request to search restaurants
function handle_request(msg, callback) {
    // let returnObject = {};
    // let param1 = req.query[0]
    // console.log("Params",req.query[0])

    // let param2 = req.query[1]
    if (msg === 'Curb Pickup') {
        restaurant.find({ curbPickup: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                callback(null, returnObject)
            }
        });
    }
    else if (msg === 'Dine In') {
        restaurant.find({ dineIn: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                callback(null, returnObject)
            }
        });
    }
    else if (msg === 'Yelp Delivery') {
        restaurant.find({ yelpDelivery: true }, function (err, docs) {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = docs
                callback(null, returnObject)
            }
        });
    }
    else {
        restaurant.find({
            "$or": [{
                // 'restaurantName': { $regex: '/.*' + msg + '.*/' }
                'restaurantName': msg
            }]
            // {
            //     "cusine": { $regex: '/.*' + msg + '.*/' }
            // },
            // {
            //     "location": { $regex: '/.*' + msg + '.*/' }
            // },
            // {
            //     "city": { $regex: '/.*' + msg + '.*/' }
            // },
            // {
            //     "zipcode": { $regex: '/.*' + msg + '.*/' }
            // },
            // {
            //     "zipcode": { $regex: '/.*' + msg + '.*/' }
            // },
            // {
            //     "menuItem.dishName": { $regex: '/.*' + msg + '.*/' }
            // }]
        }, (err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                callback(null, returnObject)
            }
        })
    }

}
exports.handle_request = handle_request
