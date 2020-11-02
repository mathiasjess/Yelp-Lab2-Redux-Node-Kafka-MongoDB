var customer = require('../../../Backend/models/Customer')
require('../../../Backend/mongoose')

var bcrypt = require('bcryptjs');
const saltRounds = 10;


// Route to handle Post Request Call for customer Registration
function handle_request(msg, callback) {
    password = msg.password

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
                firstName: msg.firstName,
                lastName: msg.lastName,
                email: msg.email,
                password: value
            }
            console.log("My object", myObj)
            const newCustomer = new customer(myObj);
            newCustomer.save(err => {
                if (err) {
                    callback(err)
                }
                else {
                    callback(null, "success")
                }
            })
        })

}

exports.handle_request = handle_request