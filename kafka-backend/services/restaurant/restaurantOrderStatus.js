var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle get request for orders summary
function handle_request(msg, callback){
    let returnObject = {}
    console.log("Inside restaurant Order Summary");
    restaurant.findById(msg, { 'orders': 1, _id: 0 }, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            // res.json(returnObject)
            console.log("Menu Data", returnObject)
            callback(null, returnObject)
        }
    })  
}

exports.handle_request = handle_request