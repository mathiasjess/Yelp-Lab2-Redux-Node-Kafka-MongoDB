require('../../../Backend/mongoose')
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')

function handle_request(msg, callback) {
    let returnObject = {}
        // restaurant.aggregate([
        //     {$unwind: '$events'},
        //     {$match : {"events": {"registerdUsers":{"$customerID": msg}}}},
        //     {$project : {_id : 0, 
        //         eventId : "$events._id",
        //         eventName : "$events.eventName",
        //         eventDescription : "$events.eventDescription ",
        //         eventTime: "$events.eventTime",
        //         eventDate : "$events.eventDate",
        //         eventLocation: "$events.eventLocation",
        //         eventHashtag : "$events.eventHashtag"}}

        // ],(err,result)=>{
        //     if(err) {
        //         returnObject.message = 'error'
        //         callback(null, returnObject)
        //     }
        //     else{
        //         returnObject.message = "success"
        //         returnObject.data = result
        //         callback(null, returnObject)
        //     }
        // })
        restaurant.find({ 'events.registeredUsers.customerID': msg }, {
            _id: 0,restaurantName: 1, 'events._id': 1, 'events.eventName': 1, 'events.eventDescription': 1, 'events.eventTime': 1, 'events.eventDate': 1, 'events.eventLocation': 1,
            'events.eventHashtag': 1, 'events.registeredUsers.customerID' : 1, 'events.registeredUsers.customerName': 1
        }, (err, result) => {
            if (err) {
                returnObject.message = 'error'
                callback(null, returnObject)
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                callback(null, returnObject)
            }
        })
}

exports.handle_request = handle_request