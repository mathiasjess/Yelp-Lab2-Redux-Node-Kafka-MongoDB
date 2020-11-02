var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle updating order status
function handle_request(msg, callback){
    console.log("Inside converstaions");
    let returnObject = {};
    Chat.find({restaurantId: msg.restaurantId, customerId : msg.customerId},(err, result) => {
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
}

exports.handle_request = handle_request