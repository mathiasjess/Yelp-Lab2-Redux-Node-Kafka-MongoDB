var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')

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
    let returnObject = {};
    customer.find({_id:req.params.id},(err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
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
    const updateCustomerObject = {
        email: req.body.email === 'null'? null: req.body.email,
        firstName: req.body.firstName === 'null'? null: req.body.firstName,
        lastName: req.body.lastName === 'null'? null: req.body.lastName,
        DOB: req.body.DOB === 'null'? null:req.body.DOB,
        location: req.body.location === 'null'? null : req.body,
        city: req.body.city === 'null'? null : req.body.city,
        state: req.body.state === 'null'? null : req.body.state,
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

    }
    console.log("updateCustomerObject",updateCustomerObject)
    customer.updateOne({_id:req.body.id}, updateCustomerObject, (err, result) => {
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
module.exports = router;