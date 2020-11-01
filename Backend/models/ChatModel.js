const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatSchema = new Schema({
    customerId : {type: String, required: true},
    sender : {type: String},
    restaurantId : {type: String, required: true},
    chatMessage : {type: String},
    nowtime : {type:Date},
    sendertype : {type:String}
},
{
    versionKey : false
});

const ChatModel = mongoose.model('chat',ChatSchema);
module.exports = ChatModel;