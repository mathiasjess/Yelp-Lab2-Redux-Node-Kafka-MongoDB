const { version } = require('chai');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    customerID: String,
    customerName: String,
})

const CustomerSchema = new Schema({
    email :{type: String, required: true},
    password :{type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    DOB : {type:Date},
    location :{type: String},
    city :{type: String},
    state :{type: String},
    country :{type: String},
    zipcode : {type: String},
    nickName: {type: String},
    phoneNumber: {type: String},
    yelpingSince:{type:Date, default:Date.now},
    thingsILove: {type: String},
    findmeIn:{type: String},
    websiteDetails: {type: String},
    profileImage: {type: String},
    favourites: {type: String},
    headline: {type: String},
    followers:[followerSchema]
},
{
    versionKey : false
});

const CustomerModel = mongoose.model('customer',CustomerSchema);
module.exports = CustomerModel;