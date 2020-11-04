var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/customerpassport')


router.get('/allusers',checkAuth, function (req, res) {
    let returnObject = {};
    kafka.make_request('allusers',"allusers",function (err, results) {
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
router.put('/addfollowers/:id',checkAuth, function (req, res) {
    let returnObject = {};
    console.log("Inside adding followers", req.body)
    const addfollowersdetails = {
        customerId: req.params.id,
        followers : req.body
    }
    kafka.make_request('addfollowers',addfollowersdetails,function (err, results) {
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
router.get('/following/:id',checkAuth, function (req, res) {
    let returnObject = {};
    kafka.make_request('following',req.params.id,function (err, results) {
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