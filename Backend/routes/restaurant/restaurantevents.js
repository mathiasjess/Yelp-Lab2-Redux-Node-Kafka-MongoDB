var express = require('express');
var router = express.Router();

var mysqlConnection = require('../../models/index')

//Router to handle post request to add Events 
router.post('/addEvent/:id', function (req, res) {
    let returnObject = {};
        let sql6 = "insert into events (restaurantId, eventName, eventDescription, eventTime, eventDate,eventLocation,eventHashtag) values ('" +
        req.params.id + "', '" +
        req.body.eventName + "', '" +
        req.body.eventDescription + "','" +
        req.body.eventTime + "','" +
        req.body.eventDate + "','" +
        req.body.eventLocation + "','" +
         req.body.eventHashtag + "')";
    mysqlConnection.query(sql6, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            res.json(returnObject);
        }
    });
});

//Router to handle get request to fetch events
router.get('/fetchEvents/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside events")
    var sql7 = "select * from  events where restaurantId = '" + req.params.id + "'";
    mysqlConnection.query(sql7,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Events", returnObject)
        }
    })

})

//Router to handle get request to fetch Single Event
router.get('/fetchsingleevent/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside fetchSingle Event")
    console.log("ID", req.params.id);
    var sql7 = "select * from  events where eventId = '" + req.params.id + "'";
    mysqlConnection.query(sql7,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})

//Router to handle post request to edit event
router.put('/updatesingleevent', function (req, res) {
    let returnObject = {};
        let sql4 = "update events set eventName ='" + req.body.eventName
        + "',eventDescription ='" + req.body.eventDescription
        + "',eventTime ='" + req.body.eventTime
        + "',eventDate='" + req.body.eventDate
        + "',eventHashtag='" + req.body.eventHashtag
        + "',eventLocation ='" + req.body.eventLocation
        + "' where eventId ='" + req.body.eventId + "'";
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

//Router to handle delete request for an event
router.delete('/deleteEvent/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside deleting event")
    console.log("ID", req.params.id);
    var sql7 = "delete from  events where eventId = '" + req.params.id + "'";
    mysqlConnection.query(sql7,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})

//Router to handle get request to fetch list of users registered for the event
router.get('/fetchregistry/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside fetchRegistry Event")
    console.log("ID", req.params.id);
    var sql8 = "select customer.id, customer.firstName, customer.lastName from customer, eventregister where customer.id = eventregister.customerId and eventregister.eventId = " + req.params.id + "";
    console.log(sql8)
    mysqlConnection.query(sql8,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})

module.exports = router;