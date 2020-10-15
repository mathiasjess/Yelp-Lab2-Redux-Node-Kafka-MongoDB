var express = require('express');
var router = express.Router();
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
});

// var geocoder = require('geocoder');

var mysqlConnection = require('../models/index')

var bcrypt = require('bcrypt');
const saltRounds = 10;

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



//Route to handle Post Request Call for Restaurant Registration
router.post('/restaurantregister', function (req, res) {
    let addressDetails = []
    let lat = null
    let lon = null
    let address = req.body.location + ',' + req.body.city + ',' + req.body.state
    console.log("address", address)
    let returnObject = {}
    restaurantname = req.body.restaurantname
    email = req.body.email
    password = req.body.password
    location = req.body.location
    console.log("zipcode", req.body.zipcode)
    // Geocode an address.
    googleMapsClient.geocode({
        address: address
    }, function (err, response) {
        if (!err) {
            console.log(response.json.results)
            lat = response.json.results[0].geometry.location.lat
            lon = response.json.results[0].geometry.location.lng
            new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, encrypted) => {
                        if (err) throw err;
                        resolve(encrypted)
                    })
                })
            })
                .then((value) => {
                    var sql1 = "insert into restaurant (restaurantName, email, password, location,city, state, zipcode, country, latitude, longitude) values ('" + restaurantname + "', '"
                        + email + "', '"
                        + value + "','"
                        + req.body.location + "','"
                        + req.body.city + "','"
                        + req.body.state + "','"
                        + req.body.zipcode + "','" + req.body.country + "', " + lat + ", " + lon + ")";
                    console.log(sql1)
                    console.log("lat, lon", lat, lon)
                    mysqlConnection.query(sql1, function (error, rows) {
                        if (error) {
                            returnObject.message = "error";
                            returnObject.data = []
                            res.json(returnObject);
                        }
                        else {
                            returnObject.message = "Registered Successfully";
                            returnObject.data = rows[0]
                            res.json(returnObject);
                        }
                    });
                });
        }
    });

});

//Route to handle Post Request Call to update basic Restaurant Information
router.post('/restaurantlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    var sql2 = "select * from  restaurant where email = '" + email + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                res.json(returnObject);
            }
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    if (err) throw err;
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    if (value[0]) {
                        returnObject.message = "success";
                        returnObject.data = value[1]
                    }
                    else {
                        returnObject.message = "error"
                    }
                    res.json(returnObject)
                })
        })
});

//Router to handle post request to update restaurant Profile Data
router.post('/restaurantprofileUpdate/:id', upload.single('restaurantImage'), function (req, res) {
    let imagename = null;
    if (req.file) {
        imagename = req.file.filename
    }
    else{
        imagename = req.body.restaurantImage
    }
    let returnObject = {};
    console.log("ID", req.params.id);
    var sql3 = "update restaurant set restaurantImage ='" + imagename
        + "',restaurantName='" + req.body.restaurantName
        + "',email='" + req.body.email
        + "',description='" + req.body.description
        + "',contact='" + req.body.contact
        + "',location='" + req.body.location
        + "',city='" + req.body.city
        + "',state='" + req.body.state
        + "',country='" + req.body.country
        + "',zipcode='" + req.body.zipcode
        + "',timings='" + req.body.timings
        + "',curbPickup='" + req.body.curbPickup
        + "',dineIn='" + req.body.dineIn
        + "',yelpDelivery ='" + req.body.yelpDelivery
        + "' where restaurantId='" + req.params.id + "'";

    console.log(sql3)
    mysqlConnection.query(sql3, (err, result) => {
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

//Router to handle get request to fetch dishes
router.get('/restaurantprofiledetails/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside restaurant profile");
    var sql5 = "select * from  restaurant where restaurantId = '" + req.params.id + "'";
    mysqlConnection.query(sql5, (err, result) => {
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

//Router to handle post request to fetch dishes
router.get('/fetchMenu/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside fetch Menu");
    var sql5 = "select * from  menu where restaurantId = '" + req.params.id + "'";
    mysqlConnection.query(sql5, (err, result) => {
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
    var sql8 = "select * from  menu where itemID = '" + req.params.id + "'";
    mysqlConnection.query(sql8, (err, result) => {
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
    console.log("ID", req.params.id);
    var sql7 = "delete from  menu where itemID = " + req.params.id + "";
    mysqlConnection.query(sql7, (err, result) => {
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