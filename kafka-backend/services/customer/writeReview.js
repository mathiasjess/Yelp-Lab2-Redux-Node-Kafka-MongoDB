require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {};
    let addReviewObject = {
        customerID: msg.customerID,
        customerName: msg.customerName,
        customerImage: msg.customerImage,
        ratings: msg.ratings,
        comments: msg.comments
    }
    console.log("Add Review", addReviewObject)
    restaurant.updateOne(
        { _id: msg.restaurantId }, { $push: { reviews: addReviewObject } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                callback(null, returnObject)
            }
        });
};

exports.handle_request = handle_request