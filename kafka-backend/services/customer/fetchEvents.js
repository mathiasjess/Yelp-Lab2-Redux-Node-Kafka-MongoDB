require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {}
    restaurant.aggregate([
        // {$bucket:{
        //     groupBy: "$events._id", 
        //     output: {
        //     // restaurantName : 'restaurantName',
        //     // restaurantImage: 'restaurantImage',
        //     "eventID": "$events._id",
        //     "eventName":"$events.eventName"
        //     } 
        // }}
        // {$unwind : "$events"},
        {$project : {_id : 1,
            restaurantName : 1,
            restaurantImage: 1,
            events: '$events'}},
            // eventId : "$events._id",
            // eventName : "$events.eventName",
            // eventDescription : "$events.eventDescription ",
            // eventTime: "$events.eventTime",
            // eventDate : "$events.eventDate",
            // eventLocation: "$events.eventLocation",
            // eventHashtag : "$events.eventHashtag"}}
    ],(err,result)=>{
        console.log("Events results", result)
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
};

exports.handle_request = handle_request