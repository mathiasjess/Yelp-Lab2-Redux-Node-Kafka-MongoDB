var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
});

var bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/restaurantregister', function (req, res) {
    restaurant.find({ email: req.body.email }, function (err, response) {
        if (response.length >= 1) {
            console.log("Email already exists. Please enter another email ID")
        }
        else {
            let returnObject = {}
            let addressDetails = []
            let lat = null
            let lon = null
            let address = req.body.location + ',' + req.body.city + ',' + req.body.state
            console.log("address", address)
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
                            bcrypt.hash(req.body.password, salt, (err, encrypted) => {
                                if (err) throw err;
                                resolve(encrypted)
                            })
                        })
                    })
                        .then((value) => {
                            let myObj = {
                                restaurantName: req.body.restaurantName,
                                email: req.body.email,
                                password: value,
                                location: req.body.location,
                                city: req.body.city,
                                state: req.body.state,
                                country: req.body.country,
                                zipcode: req.body.zipcode,
                                latitude: lat,
                                longitude: lon,
                            }
                            console.log("My object", myObj)
                            const newRestaurant = new restaurant(myObj);
                            newRestaurant.save()
                                .then(() => res.json('New restaurant added!'))
                                .catch(err => res.json(400).json('Error' + err));
                        })
                }
            })
        }
    })

});

module.exports = router;
