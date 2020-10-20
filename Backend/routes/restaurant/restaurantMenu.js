const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

const path = require('path');
var multer = require('multer');
const restaurantOwnerModel = require('../../models/RestaurantOwnerModel');
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

// Router to handle post request to add dishes to Menu
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
    let addDishObject = {
        dishName: req.body.dishName,
        dishIngredients: req.body.dishIngredients,
        dishDescription: req.body.dishDescription,
        dishImages: req.body.dishImages,
        price: req.body.price,
        dishCategory: req.body.dishCategory
    }
    console.log("Add dish", addDishObject)
    restaurant.updateOne(
        { _id: req.body.restaurantId }, { $push:{menuItem: addDishObject}}, (err, result) => {
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

//Router to handle post request to fetch dishes
router.get('/fetchMenu/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside fetch Menu");
    restaurant.findById(req.params.id, {'menuItem':1, _id : 0}, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Menu Data", returnObject)
        }
    })

})

//Router to handle post request to fetch dish to edit or delete
router.get('/fetchdish/:id', function (req, res) {
    console.log("Inside edit dish");
    let returnObject = {};
    console.log("ID", req.params.id);
    restaurant.find({'menuItem._id':req.params.id},{'menuItem.$':1, _id : 0}, (err, result) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = result
                res.json(returnObject)
            }
        })

})

//Router to handle delete request for a dish
router.delete('/deleteMenu/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside deleting dish")
    restaurant.updateOne({},{$pull:{menuItem: {_id: req.params.id}}},{multi: true}, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})

module.exports = router;