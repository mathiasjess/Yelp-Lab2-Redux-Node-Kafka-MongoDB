var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')


// Router to handle get request to fetch dishes

function handle_request(msg, callback){
    let returnObject = {};
    console.log("Inside restaurant profile", msg);
    restaurant.findById(msg, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            // res.json(returnObject)
            console.log("Profile Data", returnObject)
        }
        callback(null, returnObject)
    })
}

exports.handle_request = handle_request