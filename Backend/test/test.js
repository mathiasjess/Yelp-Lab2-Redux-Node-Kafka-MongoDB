//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/RestaurantOwnerModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('/POST login for restaurant', () => {
    it('it should login a restaurant user', (done) => {
      chai.request('http://localhost:3001')
          .post('/restaurantloginroute/restaurantlogin')
          .send({
                email : "cocina@gmail.com",
            password :"cocina@123",
        })
        .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('object');
        done();
          });
    });
});

// This API is tested without the checkAuth

describe('/GET restaurant Profile', () => {
    let id = '5f9ef05c28f0043b28664d28'
    it('it should GET restuarant profile details', (done) => {
      chai.request('http://localhost:3001')
          .get(`/restaurantprofiledetailsroute/restaurantprofiledetails/`+ id)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});

// This API is tested without the checkAuth

describe('/GET Events from all restaurants', () => {
    let id = '5f9ef05c28f0043b28664d28'
    it('it should GET events from all restaurants', (done) => {
      chai.request('http://localhost:3001')
          .get(`/customereventsroute//fetchEvents`)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});

// This API is tested without the checkAuth

describe('/GET customer Profile', () => {
    let id = '5f8dc93ebe57c183a872f8aa'
    it('it should GET customer profile details', (done) => {
      chai.request('http://localhost:3001')
          .get(`/customerprofileroute/customerprofile/`+ id)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});


// This API is tested without the checkAuth

describe('/GET customer Order Summary', () => {
    let id = '5f8dc93ebe57c183a872f8aa'
    it('it should GET customer order summary', (done) => {
      chai.request('http://localhost:3001')
          .get(`/customerordersroute/fetchcustomerordersummary/`+ id)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});
