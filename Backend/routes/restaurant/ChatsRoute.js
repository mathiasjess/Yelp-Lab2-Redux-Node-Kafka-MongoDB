var express = require('express');
var router = express.Router();
const Chat = require('../../models/ChatModel')

//Get Chats from the database

//Router to handle post request to fetch dish to edit or delete
router.get('/getchats', function (req, res) {
    console.log("Inside edit dish");
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

module.exports = router;