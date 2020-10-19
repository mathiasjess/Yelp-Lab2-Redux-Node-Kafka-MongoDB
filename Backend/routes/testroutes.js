const router = require('express').Router();
let User = require('../models/test');


router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({
        restaurantName : req.body.restaurantName,
        email :req.body.email,
        password :req.body.password,
    });
    newUser.save()
    .then(() => res.json('New user added!'))
    .catch(err => res.json(400).json('Error' +err));

});

module.exports = router;