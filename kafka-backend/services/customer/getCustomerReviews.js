require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {}
    restaurant.find({ 'reviews.customerID': msg },
        { 'reviews': 1, _id: 0 , restaurantName: 1, restaurantImage:1}, (err, result) => {
            if (err) {
                returnObject.message = 'error'
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                callback(null, returnObject)
            }
        })
};

exports.handle_request = handle_request

