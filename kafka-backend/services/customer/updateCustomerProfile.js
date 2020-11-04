const { callbackPromise } = require('nodemailer/lib/shared');
var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')

//Router to handle post request to update Customer Profile Data
function handle_request(msg, callback) {
    let returnObject = {};
    const updateCustomerObject = {
        email: msg.email,
        firstName: msg.firstName,
        lastName: msg.lastName,
        DOB :msg.DOB,
        location: msg.location,
        city: msg.city,
        state: msg.state,
        country: msg.country,
        nickName: msg.nickName,
        phoneNumber: msg.phoneNumber,
        thingsILove: msg.thingsILove,
        findmeIn: msg.findmeIn,
        websiteDetails: msg.websiteDetails,
        favourites: msg.favourites,
        headline: msg.headline,
        zipcode: msg.zipcode,
        profileImage: msg.profileImage
    }
    console.log("updateCustomerObject",updateCustomerObject)
    customer.updateOne({_id:msg.customerId}, updateCustomerObject, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            callback(null, returnObject)
        }
        else {
            returnObject.message = "success";
            returnObject.data = msg.profileImage;
            callback(null, returnObject)
        }
    });
};
exports.handle_request = handle_request