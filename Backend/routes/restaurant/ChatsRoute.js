var express = require('express');
var router = express.Router();
const Chat = require('../../models/ChatModel')

//Get Chats from the database

//Router to get conversations
router.get('/getchats', function (req, res) {
    console.log("Inside converstaions");
    let returnObject = {};
    console.log("ID", req.params.id);
    Chat.find({restaurantId: req.query[0], customerId : req.query[1]},(err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
            }
        })

})

//Router to get conversations for restaurant
router.get('/getrestaurantconversations/:id', function (req, res) {
    console.log("Inside restaurant conversations");
    let returnObject = {};
    console.log("ID", req.params.id);
    // Chat.aggregate([
    //     {$match : {restaurantId:req.params.id}},
    //     {$group :{customerId: '$customerId', sender: '$sender'}}
    // ],(err,result)=>{
    Chat.find({restaurantId:req.params.id, sendertype: "customer"}).sort({nowtime:-1}).exec((err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
            }
        })
})

//Router to get conversations for customer
router.get('/getcustomerconversations/:id', function (req, res) {
    console.log("Inside edit dish");
    let returnObject = {};
    console.log("ID", req.params.id);
    Chat.find({customerId:req.params.id, sendertype: "restaurant"}).sort({nowtime:-1}).exec((err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
            }
        })
})

module.exports = router;