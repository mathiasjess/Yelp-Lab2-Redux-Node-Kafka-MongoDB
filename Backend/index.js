//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path')
require('./mongoose');
// const { mongoDB } = require('./utils/config')
const mongoose = require('mongoose')


const server = require("http").createServer(app);
const io = require('socket.io')(server)
const Chat = require('./models/ChatModel')
const PORT = process.env.PORT || 3001


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Passport middleware
const passport = require('passport');
app.use(passport.initialize());

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(express.static(path.join(__dirname + 'public')));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());


//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use(express.static(__dirname + '/public'));

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
}

// Sending and recieving messages using socket.io

io.on("connection", socket => {
    socket.on("Input Chat Message", msg => {
        let chat = new Chat({
            customerId: msg.customerId,
            sender: msg.sender,
            restaurantId: msg.restaurantId,
            chatMessage: msg.chatMessage,
            nowtime: msg.nowtime,
            sendertype : msg.sendertype
        })
        console.log("Chat details", chat)
        chat.save((err, doc) => {
            if (err) return res.json({ success: false })
            Chat.find({ "_id": doc._id }, (err,result)=>{
                if(err) return res.json({message: "Error"})
                return io.emit("Output Chat Message", result)
            })
        })
    })
})

// Fetching Routes of restaurant

var registerrestaurant = require('./routes/restaurant/restaurantRegistration')
var restaurantloginroute = require('./routes/restaurant/restaurantLogin')
let restaurantprofiledetailsroute = require('./routes/restaurant/restaurantProfile')
var restaurantmenuroute = require('./routes/restaurant/restaurantMenu')
var restauranteventsroute = require('./routes/restaurant/restaurantEvents')
var restaurantordersroute = require('./routes/restaurant/restaurantOrders')
var restaurantreviewsroute = require('./routes/restaurant/restaurantReviews')
var chatroutes = require('./routes/restaurant/ChatsRoute')

app.use('/registerrestaurant', registerrestaurant);
app.use('/restaurantloginroute', restaurantloginroute);
app.use('/restaurantprofiledetailsroute', restaurantprofiledetailsroute);
app.use('/restaurantmenuroute', restaurantmenuroute)
app.use('/restauranteventsroute', restauranteventsroute)
app.use('/restaurantordersroute', restaurantordersroute)
app.use('/restaurantreviewsroute', restaurantreviewsroute)
app.use('/chatroutes', chatroutes)

// Customer Routes
var customerregistrationroute = require('./routes/customer/customerRegistration');
var customerloginroute = require('./routes/customer/customerLogin')
var customerprofileroute = require('./routes/customer/customerProfile')
var customersearchroute = require('./routes/customer/searchRestaurant')
var customerreviewroute = require('./routes/customer/customerReview')
var customereventsroute = require('./routes/customer/events')
var customerordersroute = require('./routes/customer/customerOrders')
var allcustomersroute = require('./routes/customer/friends')

app.use('/customerregistrationroute', customerregistrationroute)
app.use('/customerloginroute', customerloginroute)
app.use('/customerprofileroute', customerprofileroute)
app.use('/customersearchroute', customersearchroute)
app.use('/customerreviewroute', customerreviewroute)
app.use('/customereventsroute', customereventsroute)
app.use('/customerordersroute', customerordersroute)
app.use('/allcustomersroute', allcustomersroute)

server.listen(PORT);
console.log("Server Listening on port 3001");