var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')

function handle_request(msg,callback) {
    let returnObject = {};
    customer.find({}, { '_id': 1, 'firstName': 1, 'lastName': 1, 'nickName': 1 , 'zipcode': 1}, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            callback(null, returnObject)
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            callback(null, returnObject)
        }
    })
}

exports.handle_request = handle_request