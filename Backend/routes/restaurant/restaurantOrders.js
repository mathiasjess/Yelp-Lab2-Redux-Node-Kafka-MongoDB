var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/restaurantpassport')

//Router to handle get request for orders summary
// router.get('/restaurantordersummary/:id', checkAuth, function(req,res) {
//     console.log("Inside restaurant Order Summary");
//     kafka.make_request('restaurantorderstatus', req.params.id, function (err, results) {
//         console.log('In result');
//         console.log(results);
//         if (err) {
//             console.log("Inside err");
//             res.json({
//                 status: "error",
//                 msg: "System Error, Try Again."
//             })
//         } else {
//             console.log("Inside else");
//             res.json({
//                 data: results
//             });
//             res.end();
//         }
//     });
// })

//Router to handle updating order status
router.put('/updateorderstatus', function (req, res) {
    console.log("Req body", req.body)
    const updateorder = {
        orderID : req.body.orderID,
        delivery_status: req.body.delivery_status,
        deliveryFilter: req.body.deliveryFilter

    }
    kafka.make_request('updateorderstatus',updateorder, function (err, results) {
        console.log('In result');
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
    });
});

//Router to handle cancelling order 
router.put('/cancelorder', function (req, res) {
    let returnObject = {};
    const cancelorder = {
        orderID : req.body.orderID,
        delivery_status: req.body.delivery_status,
        deliveryFilter: req.body.deliveryFilter

    }
    kafka.make_request('cancelorder', cancelorder, function (err, results) {
        console.log('In result');
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
    });
});

module.exports = router;