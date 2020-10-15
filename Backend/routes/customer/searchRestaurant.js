var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

//Router to handle get request to search restaurants
router.get('/searchforrestaurant', function(req,res) {
    let returnObject = {};
    console.log(req.query)
    let param1 = req.query[0]
    let sql1 = null;
    // let param2 = req.query[1]
    if (param1 === 'Curb Pickup'){
        sql1 = "select * FROM `restaurant` WHERE curbPickup = 1";
    }
    else if (param1 === 'Dine In'){
        sql1 = "select * FROM `restaurant` WHERE dineIn = 1";
    }
    else if(param1 === 'Yelp Delivery'){
        sql1 = "select * FROM `restaurant` WHERE yelpDelivery = 1";
    }
    else{
        sql1 = "select * FROM `restaurant` WHERE restaurantId in (SELECT restaurantId from `menu` where dishName LIKE '" 
        + '%' +param1+ '%' + "' ) OR zipcode LIKE '"+ '%'  + param1 
        + '%'+ "' OR location LIKE '"+ '%'  
        + param1 + '%'+ "' OR city LIKE '"+ '%' 
         + param1 + '%'+ "' OR cuisine LIKE '"
          + '%' +param1+ '%' + "' OR restaurantName LIKE '"
          + '%' +param1+ '%' + "'";
    }
    console.log(param1)
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
