var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')
const jwt = require('jsonwebtoken')
const {secret} = require('../../../Backend/utils/config')

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Route to handle Post Request Call for customer Registration
function handle_request(msg, callback) {
    let returnObject = {};
    let loginresult = null;
    email = msg.email
    password = msg.password
    new Promise((resolve, reject) => {
        customer.find({ email: email }, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                callback(error, returnObject)
            }
            loginresult = result[0]
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
                        const payload = {_id: loginresult._id, email:loginresult.email, role:'customer'};
                        console.log(payload)
                        const token = jwt.sign(payload, secret, {
                            expiresIn : 1008000
                        });
                        returnObject.message = "success";
                        returnObject.data = value[1]
                        returnObject.token = "JWT "+ token
                        returnObject.firstName = loginresult.firstName
                        returnObject.lastName = loginresult.lastName
                        returnObject.zipcode = loginresult.zipcode
                    }
                    else {
                        returnObject.message = "Invalid credentials"
                    }
                    callback(null, returnObject)
                })
        })
}

exports.handle_request = handle_request