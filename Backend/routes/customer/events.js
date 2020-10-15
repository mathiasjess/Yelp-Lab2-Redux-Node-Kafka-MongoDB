var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

router.get('/fetchEvents', function(req,res) {
    let returnObject = {}
    let sql1 = "SELECT * from events ORDER by eventDate DESC";
    mysqlConnection.query(sql1,(err,result)=>{
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


router.post('/registerForEvent', function (req, res) {
    let returnObject = {};
    console.log("Inside register for event details");
    let sql2 = "INSERT INTO eventregister (eventId, restaurantId, customerId,customerName ) VALUES (" + req.body.eventId
        + "," + req.body.restaurantId
        + "," + req.body.customerId 
        + ", '"+req.body.customerName+ "')";
        console.log(sql2)
        mysqlConnection.query(sql2,(err, results) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                res.json(returnObject)
            }
        })
})

router.get('/fetchSingleEvent/:value', function(req,res) {
    let returnObject = {}
    let sql3 = "SELECT * from events where eventName = '" + req.params.value + "'";
    mysqlConnection.query(sql3,(err,result)=>{
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

router.get('/fetchcustomerEvent/:id', function(req,res) {
    let returnObject = {}
    let sql4 = "SELECT * from events where eventId in (Select eventId from eventregister where customerId = " + req.params.id + ")";
    mysqlConnection.query(sql4,(err,result)=>{
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

router.delete('/deleteregisteredevent/:id', function(req,res) {
    let returnObject = {}
    console.log("Inside delete event");
    let sql4 = "DELETE from eventregister where customerId = " + req.params.id + "";
    console.log(sql4)
    mysqlConnection.query(sql4,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log('Events',returnObject)
        }
    })
})
router.get('/fetchsinglevent/:id', function(req,res) {
    let returnObject = {}
    let sql1 = "SELECT * from events where eventId = "+req.params.id+"";
    console.log("Inside Individual event",sql1)
    mysqlConnection.query(sql1,(err,result)=>{
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