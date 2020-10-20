var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//Router to handle post request of the customer writing review

router.post('/writereview', function (req, res) {
    let returnObject = {};
    let addReviewObject = {
        customerID: req.body.id,
        customerName: req.body.firstName + ' ' + req.body.lastName,
        customerImage: req.body.profileImage,
        ratings: req.body.ratings,
        comments: req.body.comments
    }
    console.log("Add Review", addReviewObject)
    restaurant.updateOne(
        { _id: req.body.restaurantId }, { $push: { reviews: addReviewObject } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                returnObject.data = result;
                res.json(returnObject);
            }
        });
});

// Get details of customerreview for all restaurants
router.get('/getcustomerreviews/:id', function (req, res) {
    let returnObject = {}
    restaurant.find({ 'reviews.customerID': req.params.id },
        { 'reviews': 1, _id: 0 , restaurantName: 1, restaurantImage:1}, (err, result) => {
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

//Get details of an individual customer's reviews for all restaurants



module.exports = router;