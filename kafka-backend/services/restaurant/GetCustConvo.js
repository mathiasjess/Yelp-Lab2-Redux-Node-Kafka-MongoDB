var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle updating order status
function handle_request(msg, callback) {
    console.log("Inside restaurant conversations");
    let returnObject = {};
    // Chat.aggregate([
    //     {$match : {restaurantId:req.params.id}},
    //     {$group :{customerId: '$customerId', sender: '$sender'}}
    // ],(err,result)=>{

    Chat.find({ customerId: msg, sendertype: "restaurant" }).sort({ nowtime: -1 }).exec((err, result) => {
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