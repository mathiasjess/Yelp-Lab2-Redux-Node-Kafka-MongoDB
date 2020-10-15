var mysqlConnection = require('../models/index')
var chai = require("chai"),
chaiHttp = require("chai-http");
chai.use(chaiHttp)

const api_host = "http://localhost";
const api_port = "3001"
const api_url = api_host + ":" + api_port;

var expect = chai.expect;

it("Test to view profile", function(done){
    chai
    .request(api_url)
    .get("/customer/customerprofile")
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
    })
})
