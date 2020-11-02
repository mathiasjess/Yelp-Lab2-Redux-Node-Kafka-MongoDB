var customer = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Fetch order summary
function handle_request(msg, callback) {
    console.log("Inside Customer Order History");
    let returnObject = {};
    console.log("ID", msg);
    restaurant.find({ 'orders.customerID': msg }, {
        _id: 0, 'restaurantName': 1, 'restaurantImage': 1, 'orders._id': 1, 'orders.totalPrice': 1, 'orders.deliveryOption': 1, 'orders.delivery_status': 1,
        'orders.deliveryFilter': 1, 'orders.orderDetails': 1
    }, (err, result) => {
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

