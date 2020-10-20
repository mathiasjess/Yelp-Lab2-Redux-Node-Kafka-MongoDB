var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//$lookup to aggregate data from customer model and restaurantowner model



// // Get details of all customer reviews for a particular restaurant
// router.get('/getrestaurantreview/:id', function(req,res) {
//     let returnObject = {}
//     restaurant.find(req.params.id, {'reviews':1, _id : 0},(err,result)=>{
//         if(err) {
//             returnObject.message = 'error'
//         }
//         else{
//             returnObject.message = "success"
//             returnObject.data = result
//             res.json(returnObject)
//         }
//     })
// })

module.exports = router;