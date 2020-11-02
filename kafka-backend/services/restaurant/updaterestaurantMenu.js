var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
require('../../../Backend/mongoose')

//Router to handle post request to add dishes to Menu
function handle_request(msg, callback){
    let returnObject = {};
    let addDishObject = {
        dishName: msg.dishName,
        dishIngredients: msg.dishIngredients,
        dishDescription: msg.dishDescription,
        dishImages: msg.dishImages,
        price: msg.price,
        dishCategory: msg.dishCategory
    }
    console.log("Add dish", addDishObject)
    restaurant.updateOne(
        { _id: msg.restaurantId }, { $push:{menuItem: addDishObject}}, (err, result) => {
            if (err) {
                returnObject.message = "error";
            }
            else {
                returnObject.message = "success";
                restaurant.find({ _id: msg.restaurantId, 'menuItem.dishName': msg.dishName }, { 'menuItem.$': 1, _id: 0 }, (err, docs) => {
                    returnObject.data = docs
                    console.log("Response",returnObject.data)
                    callback(null, returnObject)
                })
            }
        });
}
exports.handle_request = handle_request