var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')

// Route to handle Post Request Call for customer Registration
router.post('/customerregister', function (req, res) {
    kafka.make_request('customerregister', req.body, function (err, results) {
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