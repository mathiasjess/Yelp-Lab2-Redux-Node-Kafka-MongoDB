var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

router.get('/customerprofile', function(req,res) {
    let returnObject = {};
    let param1 = req.query[0]
    console.log(req.query[0])
    var sql1 = "select * FROM customer WHERE id = " + param1 + ""; 
    mysqlConnection.query(sql1,(err,result)=>{
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

router.get('/getcustomerreview', function(req,res) {
    let returnObject = {};
    let param1 = req.query[0]
    console.log(req.query[0])
    var sql1 = "select restaurant.restaurantName, review.ratings, review.comments, review.reviewDate FROM restaurant, review WHERE restaurant.restaurantId = review.restaurantId and id = " + param1 + ""; 
    mysqlConnection.query(sql1,(err,result)=>{
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