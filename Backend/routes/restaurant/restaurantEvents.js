var express = require('express');
var router = express.Router();
var restaurant = require('../../models/RestaurantOwnerModel')

//Router to handle post request to add dishes to Menu
router.post('/addEvent/:id', function (req, res) {
    let returnObject = {};
    let addEventObject = {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventTime: req.body.eventTime,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        eventHashtag: req.body.eventHashtag
    }
    console.log("Add Event", addEventObject)
    restaurant.updateOne(
        { _id: req.params.id }, { $push: { events: addEventObject } }, (err, result) => {
            if (err) {
                returnObject.message = "error";
                res.json(returnObject);
            }
            else {
                returnObject.message = "success";
                restaurant.find({ 'events.eventName': req.body.eventName }, { 'events.$': 1, _id: 0 }, (err, result) => {
                    returnObject.data = result
                    console.log(returnObject.data)
                    res.json(returnObject)
                })
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
router.put('/updatesingleevent', function (req, res) {
    let returnObject = {};
    restaurant.updateOne({ 'events._id': req.body.itemId },
        {
            '$set': {
                'events.$.eventName': req.body.eventName,
                'events.$.eventDescription': req.body.eventDescription,
                'events.$.eventTime': req.body.eventTime,
                'events.$.eventDate': req.body.eventDate,
                'events.$.eventLocation': req.body.eventLocation,
                'events.$.eventHashtag': req.body.eventHashtag
            }
        }, (err, result) => {
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

router.delete('/deleteEvent/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside deleting Event")
    restaurant.updateOne({}, { $pull: { events: { _id: req.params.id } } }, { multi: true }, (err, result) => {
        if (err) {
            returnObject.message = 'error'
        }
        else {
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})

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