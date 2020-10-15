var express = require('express');
var router = express.Router();
var mysqlConnection = require('../models/index')

const query = `CREATE TABLE Customer (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255),
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    DOB DATE NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    nickName varchar(255) NOT NULL,
    phoneNumber varchar(255) NOT NULL,
    yelpingSince DATE NOT NULL,
    thingsILove varchar(255) NOT NULL,
    websiteDetails varchar(255) NOT NULL,
    profileImage varchar(255)
)`;

router.get('/',(req,res)=>{
    mysqlConnection.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result)
        res.send("Table created successfully")
    })
})

module.exports = router;


