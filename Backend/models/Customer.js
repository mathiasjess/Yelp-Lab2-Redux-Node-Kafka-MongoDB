const { version } = require('chai');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username :{type: String, required: true},
    email :{type: String, required: true},
    password :{type: String, required: true},
    firstName: String,
    lastName: String,
    DOB : {type:Date},
    location :{type: String},
    city :{type: String},
    state :{type: String},
    country :{type: String},
    zipcode : {type: String},
    nickName: String,
    phoneNumber: String,
    yelpingSince:{type:Date, default:Date.now},
    thingsILove: String,
    findmeIn:String,
    websiteDetails: String,
    profileImage: String,
    favourites: String,
    headline: String
},
{
    versionKey : false
});

const CustomerModel = mongoose.model('customer',CustomerSchema);
module.exports = CustomerModel;