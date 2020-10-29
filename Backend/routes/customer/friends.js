var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')


router.get('/allusers', function (req, res) {
    let returnObject = {};
    customer.find({}, { '_id': 1, 'firstName': 1, 'lastName': 1, 'nickName': 1 , 'zipcode': 1}, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    })
})
router.put('/addfollowers/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside adding followers", req.body)
    customer.updateOne(
        { _id: req.params.id }, { $push: { followers: req.body } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                res.json(returnObject)
            }
        })
});
router.get('/following/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside adding followers", req.body)
    customer.find({'followers.customerID':req.params.id},{ _id : 1, 'firstName': 1, 'lastName':1, 'zipcode': 1}, (err, result) => {
        // restaurant.find({'orders.customerID':req.params.id},{ _id : 0, 'orders': 1}, (err, result) => {

            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
                console.log(returnObject.data)
            }
        })

});

module.exports = router;