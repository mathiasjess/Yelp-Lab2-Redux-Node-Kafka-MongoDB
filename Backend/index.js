//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3001


var customerlogin = require('./routes/customer/customerlogin')
var customerprofile = require('./routes/customer/customerProfile')
var searchRestaurant = require('./routes/customer/searchRestaurant')
var review = require('./routes/customer/customerreview')
var orders = require('./routes/customer/orders')
var customerevents = require('./routes/customer/events')




var restaurant = require('./routes/restaurant')
var restaurantevents = require('./routes/restaurant/restaurantevents');
var restaurantorders = require('./routes/restaurant/restaurantorders')
var customerdetails = require('./routes/restaurant/customerdetails')
var restaurantreviews = require('./routes/restaurant/restaurantreviews')
var restaurantmenu = require('./routes/restaurant/updatemenudetails')

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));
// app.use(express.static(path.join(__dirname + "./public")));
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


//Route to handle action calls for customer login and register
app.use('/customerlogin',customerlogin)

//Route to handle all actions for customer profile
app.use('/customerprofile',customerprofile)

//Route to handle all actions for customer search
app.use('/search',searchRestaurant)

//Route to handle all actions for customer search
app.use('/reviews',review)

//Route to handle all actions for customer orders
app.use('/orders',orders)

//Route to handle all actions for customer orders
app.use('/events',customerevents)

//Route to handle Post Request Call for restaurant
app.use('/restaurant',restaurant)  

//Routes to handle Calls for restaurant event actions
app.use('/restaurantevents',restaurantevents)

//Routes to handle Calls for restaurant orders
app.use('/restaurantorders',restaurantorders)

//Routes to handle Calls for restaurant reviews
app.use('/restaurantreviews', restaurantreviews)

//Routes to handle Calls for customer details
app.use('/restaurantviewofcustomer',customerdetails)

app.use('/restaurantmenu', restaurantmenu)

//start your server on port 3001
app.listen(PORT);
console.log("Server Listening on port 3001");