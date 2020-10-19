const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    dishCategory : String,
    dishName : String,
    dishDescription: String,
    dishIngredients: String,
    dishImages : { type : Array , "default" : [] },
    price: Number

})

const EventSchema = new Schema({
    eventName : String,
    eventDescription : String,
    eventTime: String,
    eventDate : Date,
    eventLocation: String,
    eventHashtag : String,
    registeredUsers: [{
        customerID: String,
        customerName: String
    }]
})

const ReviewSchema = new Schema({
    customerID: String,
    ratings: Number,
    comments: String,
    reviewDate: {type:Date, default:Date.now}
})

const OrderSummarySchema = new Schema({
    customerID: String,
    totalPrice: Number,
    deliveryOption: String,
    delivery_status: String,
    deliveryFilter: String,
    orderDate : {type:Date, default:Date.now},
    orderDetails : [{
        dishName: String,
        price: Number,
        quantity: Number
    }]
})

var restaurantOwnerSchema = new Schema({
    restaurantName :{type: String, required: true},
    email :{type: String, required: true},
    password :{type: String, required: true},
    description :{type: String},
    cuisine :{type: String},
    contact :{type: String},
    location :{type: String},
    city :{type: String},
    state :{type: String},
    country :{type: String},
    zipcode : {type: String},
    restaurantImage : {type: String},
    timings : {type: String},
    description :{type: String},
    curbPickup : {type: Boolean},
    dineIn : {type: Boolean},
    dineIn : {type: Boolean},
    yelpDelivery : {type: Boolean},
    latitude : {type: Number},
    longitude : {type: Number},
    menuItem : [MenuSchema],
    events : [EventSchema],
    reviews : [ReviewSchema],
    orders : [OrderSummarySchema]
},
{
    versionKey : false
});

const restaurantOwnerModel = mongoose.model('restaurantowner',restaurantOwnerSchema);
module.exports = restaurantOwnerModel;