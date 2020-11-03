var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')

function handle_request(msg, callback) {
    let returnObject = {};
    console.log("Inside adding followers", msg.followers)
    customer.updateOne(
        { _id: msg.customerId }, { $push: { followers: msg.followers } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null, returnObject);
            }
            else {
                returnObject.message = "success";
                callback(null, returnObject)
            }
        })
}

exports.handle_request = handle_request