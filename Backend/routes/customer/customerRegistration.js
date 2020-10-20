var express = require('express');
var router = express.Router();
var customer = require('../../models/Customer')

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Route to handle Post Request Call for customer Registration
router.post('/customerregister', function (req, res) {
    let returnObject = {};
    password = req.body.password

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
            let myObj = {
                username : req.body.username,
                email : req.body.email,
                password : value
            }
            console.log("My object", myObj)
            const newCustomer = new customer(myObj);
            newCustomer.save()
                .then(() => res.json('New Customer added!'))
                .catch(err => res.json(400).json('Error' + err));
        })

});

module.exports = router;