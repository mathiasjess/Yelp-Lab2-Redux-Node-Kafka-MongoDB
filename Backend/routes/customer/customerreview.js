var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

//Router to handle post request of the customer writing review
router.post('/writereview', function (req, res) {
    let returnObject = {};
    let sql1 = "insert into review  (restaurantId, id, ratings, comments) values (" + req.body.restaurantId + ", " + req.body.customerId + ", " + req.body.ratings + ", '" + req.body.comments + "')";
    mysqlConnection.query(sql1, (err, rows) => {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = rows[0];
            res.json(returnObject);
        }
    });
});

//Router to handle get request of reviews for a particular restaurant
router.get('/getrestaurantreview/:id', function(req,res) {
    let returnObject = {}
    let sql2 = "SELECT customer.id, customer.profileImage, customer.firstName, customer.LastName,review.reviewDate, review.ratings, review.comments from customer, review where customer.id = review.id and review.restaurantId = " + req.params.id + "";
    console.log(sql2)
    mysqlConnection.query(sql2,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })
})

//Router to handle get request of reviews for a particular restaurant
router.get('/getcustomerreview/:id', function(req,res) {
    let returnObject = {}
    let sql3 = "SELECT restaurant.restaurantImage, restaurant.restaurantName ,review.reviewDate, review.ratings, review.comments from restaurant, review where restaurant.restaurantId = review.restaurantId AND review.id = " + req.params.id + " ";
    console.log("Inside customer reviews", sql3)
    mysqlConnection.query(sql3,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })
})

module.exports = router;