var express = require('express');
var restaurant = require('../../../Backend/models/RestaurantOwnerModel')
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
});
require('../../../Backend/mongoose')

var bcrypt = require('bcryptjs');
const saltRounds = 10;

function handle_request(msg, callback){
    restaurant.find({ email: msg.email }, function (err, response) {
        if (response.length >= 1) {
            console.log("Email already exists. Please enter another email ID")
        }
        else {
            let returnObject = {}
            let addressDetails = []
            let lat = null
            let lon = null
            let address = msg.location + ',' + msg.city + ',' + msg.state
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
                            bcrypt.hash(msg.password, salt, (err, encrypted) => {
                                if (err) throw err;
                                resolve(encrypted)
                            })
                        })
                    })
                        .then((value) => {
                            let myObj = {
                                restaurantName: msg.restaurantname,
                                email: msg.email,
                                password: value,
                                location: msg.location,
                                city: msg.city,
                                state: msg.state,
                                country: msg.country,
                                zipcode: msg.zipcode,
                                latitude: lat,
                                longitude: lon,
                            }
                            console.log("My object", myObj)
                            const newRestaurant = new restaurant(myObj);
                            newRestaurant.save(err=>{
                                if(err){
                                    callback(err)
                                }
                                else{
                                    callback(null, "success")
                                }
                            })
                        })
                        .catch((value)=>{
                            console.log(value);
                        })
                }
            })
        }
    })
}

exports.handle_request = handle_request
