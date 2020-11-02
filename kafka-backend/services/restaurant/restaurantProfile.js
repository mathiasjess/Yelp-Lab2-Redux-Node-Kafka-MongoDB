var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

// Router to handle post request to update restaurant Profile Data
function handle_request(msg, callback){
    let returnObject = {}
    const updateObject = {
        restaurantImage: msg.restaurantImage,
        restaurantName : msg.restaurantName,
        email : msg.email,
        description : msg.description,
        contact : msg.contact,
        location : msg.location, 
        city : msg.city,
        state : msg.state, 
        country : msg.country, 
        zipcode : msg.zipcode,
        timings : msg.timings,
        curbPickup : msg.curbPickup,
        dineIn : msg.dineIn,
        yelpDelivery : msg.yelpDelivery
    }
    restaurant.findByIdAndUpdate(msg.restaurantId, updateObject, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
        }
        else {
            returnObject.message = "success";
            returnObject.data = msg.restaurantImage;
            console.log("Inside kafka-backend", returnObject)
            // res.json(returnObject);
        }
        callback(null, returnObject)
    });
}

exports.handle_request = handle_request