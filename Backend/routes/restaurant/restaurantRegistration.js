var express = require('express');
var router = express.Router();
const kafka = require('../../kafka/client')

// Post restaurant registration information
router.post('/restaurantregister', function (req, res) {
    console.log("Req.body", req.body)
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
