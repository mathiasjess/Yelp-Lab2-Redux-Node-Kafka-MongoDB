var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')

//Router to handle post request of the customer writing review

router.post('/writereview', function (req, res) {
    let returnObject = {};
    let addReviewObject = {
        restaurantId : req.body.restaurantId,
        customerID: req.body.id,
        customerName: req.body.firstName + ' ' + req.body.lastName,
        customerImage: req.body.profileImage,
        ratings: req.body.ratings,
        comments: req.body.comments
    }
    console.log("Add Review", addReviewObject)
    kafka.make_request('writereview', addReviewObject, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            }); 
            res.end();
        }
    })
});

// Get details of customerreview for all restaurants
router.get('/getcustomerreviews/:id', function (req, res) {
    let returnObject = {}
    kafka.make_request('getcustomerreviews', req.params.id, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            }); 
            res.end();
        }
    })
})



module.exports = router;