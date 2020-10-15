var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

router.get('/getrestaurantreview', function(req,res) {
    let returnObject = {};
    var sql1 = "select customer.profileImage, customer.customerfirstName, customer.customerlastName, review.ratings,review.comments, review.reviewDate FROM customer, review WHERE customer.id = review.id and id = " + req.params.id + ""; 
    console.log(sql1)
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