var express = require('express');
var router = express.Router();
const kafka = require('../../kafka/client')
// var restaurant = require('../../models/RestaurantOwnerModel')
// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
// });

// var bcrypt = require('bcrypt');
// const saltRounds = 10;

router.post('/restaurantregister', function (req, res) {
    kafka.make_request('restaurantregister', req.body, function (err, results) {
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

module.exports = router;
