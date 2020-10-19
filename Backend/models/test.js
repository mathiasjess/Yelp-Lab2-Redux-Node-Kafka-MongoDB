const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testSchema = new Schema({
    restaurantName :{type: String, required: true},
    email :{type: String, required: true},
    password :{type: String, required: true}
},
{
    versionKey : false
});

const test = mongoose.model('test',testSchema);
module.exports = test;