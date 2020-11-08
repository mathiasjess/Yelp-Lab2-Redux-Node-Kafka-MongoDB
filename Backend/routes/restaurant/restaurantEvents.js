var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')
const kafka = require('../../kafka/client')
const { checkAuth } = require('../../utils/restaurantpassport')

//Router to handle post request to add dishes to Menu
router.post('/addEvent/:id',function (req, res) {
    let returnObject = {};
    console.log("Req.body of add events", req.body)
    let addEventObject = {
        restaurantId : req.params.id,
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventTime: req.body.eventTime,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        eventHashtag: req.body.eventHashtag
    }
    console.log("Add Event", addEventObject)
    kafka.make_request('addevent',addEventObject, function (err, results) {
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
});

// // Router to handle post request to fetch events for the restaurant
// router.get('/fetchEvents/:id', function (req, res) {
//     let returnObject = {};
//     console.log("Inside fetch Events");
//     restaurant.findById(req.params.id, { 'events': 1, _id: 0 }, (err, result) => {
//         if (err) {
//             returnObject.message = 'error'
//         }
//         else {
//             returnObject.message = "success"
//             returnObject.data = result
//             res.json(returnObject)
//             console.log("Menu Data", returnObject)
//         }
//     })

// })

// //Router to handle get request to fetch Single Event

// router.get('/fetchsingleevent/:id', function (req, res) {
//     let returnObject = {};
//     console.log("Inside fetchSingle Event")
//     console.log("ID", req.params.id);
//     restaurant.find({ 'events._id': req.params.id }, { 'events.$': 1, _id: 0 }, (err, result) => {
//         if (err) {
//             returnObject.message = 'error'
//         }
//         else {
//             returnObject.message = "success"
//             returnObject.data = result
//             res.json(returnObject)
//         }
//     })

// })

//Router to handle post request to edit event
// router.put('/updatesingleevent', function (req, res) {
//     let returnObject = {};
//     restaurant.updateOne({ 'events._id': req.body.itemId },
//         {
//             '$set': {
//                 'events.$.eventName': req.body.eventName,
//                 'events.$.eventDescription': req.body.eventDescription,
//                 'events.$.eventTime': req.body.eventTime,
//                 'events.$.eventDate': req.body.eventDate,
//                 'events.$.eventLocation': req.body.eventLocation,
//                 'events.$.eventHashtag': req.body.eventHashtag
//             }
//         }, (err, result) => {
//             if (err) {
//                 returnObject.message = "error";
//                 res.json(returnObject);
//             }
//             else {
//                 returnObject.message = "success";
//                 returnObject.data = result;
//                 res.json(returnObject);
//             }
//         });
// });

//Router to handle delete request for an event

// router.delete('/deleteEvent/:id', function (req, res) {
//     let returnObject = {};
//     console.log("Inside deleting Event")
//     restaurant.updateOne({}, { $pull: { events: { _id: req.params.id } } }, { multi: true }, (err, result) => {
//         if (err) {
//             returnObject.message = 'error'
//         }
//         else {
//             returnObject.message = "success"
//             returnObject.data = result
//             res.json(returnObject)
//         }
//     })

// })

// //Router to handle get request to fetch list of users registered for the event
// router.get('/fetchregistry/:id', function (req, res) {
//     let returnObject = {};
//     console.log("Inside fetching Registered Users")
//     console.log("ID", req.params.id);
//     restaurant.find({ 'events._id': req.params.id },
//         { 'events.registeredUsers': 1, _id: 0 }, (err, result) => {
//             if (err) {
//                 returnObject.message = 'error'
//             }
//             else {
//                 returnObject.message = "success"
//                 returnObject.data = result
//                 res.json(returnObject)
//             }
//         })

// })

module.exports = router;