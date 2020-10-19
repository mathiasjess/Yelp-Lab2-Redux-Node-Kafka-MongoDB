var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')


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
    let returnObject = {};
    console.log(" Mongo ID", req.params.id);
    const updateObject = {
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
    restaurant.findByIdAndUpdate(req.params.id, updateObject, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = imagename;
            res.json(returnObject);
        }
    });
});

// Router to handle get request to fetch dishes
router.get('/restaurantprofiledetails/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside restaurant profile");
    restaurant.findById(req.params.id, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Profile Data", returnObject)
        }
    })

})

module.exports = router;