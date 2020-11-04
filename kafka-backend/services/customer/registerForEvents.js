require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {};
    console.log(msg.eventId)
    let addRegistry = {
        customerID: msg.customerID,
        customerName: msg.customerName
    }
    console.log("Add dish", addRegistry)

    restaurant.update(
        {_id: msg.restaurantId, 'events._id': msg.eventId }, {$push : {'events.$.registeredUsers' : addRegistry}}, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null,returnObject)
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                callback(null,returnObject)
            }
        });
}

exports.handle_request = handle_request