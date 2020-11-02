var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle updating order status
function handle_request(msg, callback){
    let returnObject = {};
    restaurant.updateOne({ 'orders._id': msg.orderID },
        {
            '$set': {
                'orders.$.delivery_status': msg.delivery_status,
                'orders.$.deliveryFilter': msg.deliveryFilter
            }
        }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                console.log(result)
                callback(null, returnObject)
            }
        });
}

exports.handle_request = handle_request