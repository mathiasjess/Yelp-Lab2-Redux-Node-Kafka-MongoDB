require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {}
        restaurant.aggregate([
            {$unwind: '$events'},
            {$match : {"events": {"registerdUsers":{"$customerID": msg}}}},
            {$project : {_id : 0, 
                eventId : "$events._id",
                eventName : "$events.eventName",
                eventDescription : "$events.eventDescription ",
                eventTime: "$events.eventTime",
                eventDate : "$events.eventDate",
                eventLocation: "$events.eventLocation",
                eventHashtag : "$events.eventHashtag"}}

        ],(err,result)=>{
            if(err) {
                returnObject.message = 'error'
                callback(null, returnObject)
            }
            else{
                returnObject.message = "success"
                returnObject.data = result
                callback(null, returnObject)
            }
        })
}

exports.handle_request = handle_request