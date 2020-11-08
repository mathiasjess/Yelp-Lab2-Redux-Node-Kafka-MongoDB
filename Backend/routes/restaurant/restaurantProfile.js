var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const { checkAuth } = require('../../utils/restaurantpassport')
const kafka = require('../../kafka/client')

const path = require('path');
var multer = require('multer');
const { Console } = require('console');

router.use(express.static(__dirname + "./public/"));
var filepath = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});

var upload = multer({ storage: storage });


// Router to handle post request to update restaurant Profile Data
router.post('/restaurantprofileUpdate/:id', upload.single('restaurantImage'), function (req, res) {
    let imagename = null;
    if (req.file) {
        imagename = req.file.filename
    }
    else{
        imagename = req.body.restaurantImage
    }
    console.log(" Mongo ID", req.params.id);
    const updateObject = {
        restaurantId: req.params.id,
        restaurantImage: imagename,
        restaurantName : req.body.restaurantName,
        email : req.body.email,
        description : req.body.description,
        contact : req.body.contact,
        location : req.body.location, 
        city : req.body.city,
        state : req.body.state, 
        country : req.body.country, 
        zipcode : req.body.zipcode,
        timings : req.body.timings,
        curbPickup : req.body.curbPickup,
        dineIn : req.body.dineIn,
        yelpDelivery : req.body.yelpDelivery
    }
    kafka.make_request('updaterestaurantprofile', updateObject, function (err, results) {
        console.log(updateObject.restaurantId);
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

// Router to handle get request to fetch dishes
router.get('/restaurantprofiledetails/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside restaurant profile");
    kafka.make_request('restaurantprofiledetails', req.params.id, function (err, results) {
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
})

router.get('/customerprofile/:id', function(req,res){
    kafka.make_request('customerprofiledetails', req.params.id, function (err, results) {
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
})

router.get('/getcustomerreviews/:id', function (req, res) {
    let returnObject = {}
    kafka.make_request('getcustomerreviews', req.params.id, function (err, results) {
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

module.exports = router;