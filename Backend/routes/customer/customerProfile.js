var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

const path = require('path');
var multer = require('multer')  
router.use(express.static(__dirname+"./public/"));
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

//Router to handle post request to update Customer Profile Data
router.put('/updatecustomerprofile',upload.single('profileImage'), function (req, res) {
    let returnObject = {};
    let imagename = null
    if (req.file){
        imagename = req.file.filename
    }
    else{
        imagename = req.body.profileImage
    }
    console.log(imagename)
    console.log("ID", req.body.id);
    let sql1 = "update customer set email= '" + req.body.email
    + "', firstName= '" + req.body.firstName
    + "', lastName= '" + req.body.lastName
    + "', DOB= '" + req.body.DOB
    + "', location= '" + req.body.location
    + "', city= '" + req.body.city
    + "', state= + '"+ req.body.state
    + "', country= '"+ req.body.country
    + "', nickName= '" + req.body.nickName
    + "', phoneNumber= '" + req.body.phoneNumber
    + "', thingsILove= '" + req.body.thingsILove
    + "', findmeIn= '" + req.body.findmeIn
    + "', websiteDetails= '" + req.body.websiteDetails
    + "', profileImage = '" + imagename
    + "', favourites= '" + req.body.favourites
    + "', headline= '" + req.body.headline
    + "', zipcode= '" + req.body.zipcode
    + "' where id='" + req.body.id + "'";

    console.log(sql1)
    mysqlConnection.query(sql1, (err, result) => {
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