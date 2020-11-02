var customer = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Fetch order details for a particular customer
//Send order details
function handle_request(msg, callback) {
    let returnObject = {};
    let ordersObject = {
        customerID: msg.customerID,
        customerName: msg.customerName,
        customerImage: msg.customerImage,
        totalPrice: msg.totalPrice,
        deliveryOption: msg.deliveryOption,
        delivery_status: msg.delivery_status,
        deliveryFilter: msg.deliveryFilter,
        orderDetails: msg.orderDetails
    }
    console.log("Add dish", ordersObject)
    restaurant.updateOne(
        { _id: msg.restaurantId }, { $push: { orders: ordersObject } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success";
                callback(null, returnObject)
            }
        });
}

exports.handle_request = handle_request