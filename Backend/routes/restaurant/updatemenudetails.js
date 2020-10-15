var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

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
var upload = multer({ storage: storage }).array('file');

//Router to handle post request to add dishes to Menu
router.post('/uploadpics', function (req, res) {
    let Images = []
    let returnObject = {}
    console.log("Inside upload files");
    upload(req, res, function (err) {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            req.files.map(file => {
                return Images.push(file.filename)
            })
            console.log("Images", Images)
            returnObject.data = Images;
            res.json(returnObject);
        }

    })
});

//Router to handle post request to add dishes to Menu
router.post('/updateMenu', function (req, res) {
    let returnObject = {};
    let sql4 = "insert into menu (restaurantId, dishName, dishIngredients, dishDescription,dishImage1, dishImage2,dishImage3,dishImage4,price,dishCategory) values ('" +
        req.body.restaurantId + "', '" +
        req.body.dishName + "', '" +
        req.body.dishIngredients + "','" +
        req.body.dishDescription + "','" +
        req.body.dishImage1 + "','" +
        req.body.dishImage2 + "','" +
        req.body.dishImage3 + "','" +
        req.body.dishImage4 + "','" +
        req.body.price + "','" +
        req.body.dishCategory + "')";
        console.log(sql4)
    mysqlConnection.query(sql4, (err, result) => {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    });
});

//Router to handle post request to edit dish from menu
router.put('/editMenu', function (req, res) {
    let returnObject = {};
    // console.log("filepath",filepath)
    // if(req.file){
    var sql4 = "update menu set dishName ='" + req.body.dishName
        + "',dishIngredients ='" + req.body.dishIngredients
        + "',dishDescription ='" + req.body.dishDescription
        // + "',req.file.dishImage1 ='" + req.file.originalname
        // req.file.dishImage2 + "','" +
        // req.file.dishImage3 + "','" +
        // req.file.dishImage4 + "','" +
        + "',price='" + req.body.price
        + "',dishCategory='" + req.body.dishCategory
        + "' where itemID='" + req.body.itemID + "'";
    mysqlConnection.query(sql4, (err, result) => {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    });
    // }
});

module.exports = router;