var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')
const kafka = require('../../kafka/client')

const path = require('path');
var multer = require('multer')
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

//Router to handle post request to update Customer Profile Data
router.put('/updatecustomerprofile', upload.single('profileImage'), function (req, res) {
    let returnObject = {};
    let imagename = null
    if (req.file) {
        imagename = req.file.filename
    }
    else {
        imagename = req.body.profileImage
    }
    console.log(imagename)
    console.log("ID", req.body.id);
    if(req.body.DOB === 'undefined'){
        console.log("This is undefined")
    }
    else{
        console.log(req.body.DOB)
    }
    const updateCustomerObject = {
        customerId : req.body.id,
        email: req.body.email === 'null'? null: req.body.email,
        firstName: req.body.firstName === 'null'? null: req.body.firstName,
        lastName: req.body.lastName === 'null'? null: req.body.lastName,
        DOB: req.body.DOB === 'null'? null:req.body.DOB,
        location: req.body.location === 'null'? null : req.body,
        city: req.body.city === 'null'? null : req.body.city,
        state: req.body.State === 'null'? null : req.body.State,
        country: req.body.country === 'null'? null : req.body.country,
        nickName: req.body.nickName === 'null'? null : req.body.nickName,
        phoneNumber: req.body.phoneNumber === 'null'? null : req.body.phoneNumber,
        thingsILove: req.body.thingsILove === 'null'? null: req.body.thingsILove,
        findmeIn: req.body.findmeIn === "null"? null: req.body.findmeIn,
        websiteDetails: req.body.websiteDetails === "null"? null: req.body.websiteDetails,
        favourites: req.body.favourites === "null"? null: req.body.favourites,
        headline: req.body.headline === "null"? null: req.body.headline,
        zipcode: req.body.zipcode === "null"? null: req.body.zipcode,
        profileImage: imagename === 'null'? null :imagename

        // email: req.body.email,
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // DOB :req.body.DOB,
        // location: req.body.location,
        // city: req.body.city,
        // state: req.body.state .state,
        // country: req.body.country,
        // nickName: req.body.nickName,
        // phoneNumber: req.body.phoneNumber,
        // thingsILove: req.body.thingsILove,
        // findmeIn: req.body.findmeIn,
        // websiteDetails: req.body.websiteDetails,
        // favourites: req.body.favourites,
        // headline: req.body.headline,
        // zipcode: req.body.zipcode,
        // profileImage: imagename 

    }
    console.log("updateCustomerObject",updateCustomerObject)
    kafka.make_request('updatecustomerprofile',updateCustomerObject, function (err, results) {
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