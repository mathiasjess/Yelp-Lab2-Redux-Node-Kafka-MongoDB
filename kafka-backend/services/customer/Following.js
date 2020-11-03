var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')

function handle_request(msg, callback) {
    let returnObject = {};
    customer.find({'followers.customerID':msg},{ _id : 1, 'firstName': 1, 'lastName':1, 'zipcode': 1}, (err, result) => {
        // restaurant.find({'orders.customerID':req.params.id},{ _id : 0, 'orders': 1}, (err, result) => {

            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
                callback(null, returnObject)
            }
        })
}

exports.handle_request = handle_request