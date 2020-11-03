var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle post request to add dishes to Menu
function handle_request(msg, callback){
        console.log("Event details", msg)
    let returnObject = {};
    console.log("Event details", msg)
    let addEventObject = {
        eventName: msg.eventName,
        eventDescription: msg.eventDescription,
        eventTime: msg.eventTime,
        eventDate: msg.eventDate,
        eventLocation: msg.eventLocation,
        eventHashtag: msg.eventHashtag
    }
    console.log("Add Event", addEventObject)
    restaurant.updateOne(
        { _id: msg.restaurantId }, { $push: { events: addEventObject } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success";
                restaurant.find({ _id : msg.restaurantId, 'events.eventName': msg.eventName }, { 'events.$': 1, _id: 0 }, (err, doc) => {
                    returnObject.data = doc
                    console.log("Event response",returnObject.data)
                    callback(null, returnObject)
                    // res.json(returnObject)
                })
            }
        });
}
exports.handle_request = handle_request
