var express = require('express');
var router = express.Router();
const kafka = require('../../kafka/client')
const { auth } = require("../../utils/customerpassport");
auth();

// Route to handle Post Request Call for customer Registration

router.post('/customerlogin', function (req, res) {
    kafka.make_request('customerlogin', req.body, function (err, results) {
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