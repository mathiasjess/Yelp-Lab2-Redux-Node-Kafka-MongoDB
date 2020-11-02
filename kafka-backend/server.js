var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
const Books = require('./services/books.js');
const restaurantregister = require('./services/restaurant/restaurantRegistration')
const restaurantlogin = require('./services/restaurant/restaurantLogin')
const updaterestaurantprofile = require('./services/restaurant/restaurantProfile')
const restaurantprofiledetails = require('./services/restaurant/restaurantProfileDetails')
const updatemenu = require('./services/restaurant/updaterestaurantMenu')
const addevent = require('./services/restaurant/restaurantEvents')
const restaurantorderstatus = require('./services/restaurant/restaurantOrderStatus')
const updateorderstatus = require('./services/restaurant/updateOrderStatus')
const cancelorder = require('./services/restaurant/CancelOrder')
const getchats = require('./services/restaurant/GetChats')
const getrestaurantconversations = require('./services/restaurant/GetRstrntConvo')
const getcustomerconversations = require('./services/restaurant/GetCustConvo')


const customerregister = require('./services/customer/customerRegistration')
const customerlogin = require('./services/customer/customerLogin')
const sendorderdetails = require('./services/customer/SendOrderDetails')
const fetchordersummary = require('./services/customer/fetchOrderSummary')


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Books)
handleTopicRequest("restaurantregister", restaurantregister)
handleTopicRequest("restaurantlogin", restaurantlogin)
handleTopicRequest("updaterestaurantprofile", updaterestaurantprofile)
handleTopicRequest("restaurantprofiledetails", restaurantprofiledetails)
handleTopicRequest("updatemenu", updatemenu)
handleTopicRequest("addevent", addevent)
handleTopicRequest("restaurantorderstatus", restaurantorderstatus)
handleTopicRequest("updateorderstatus", updateorderstatus)
handleTopicRequest("cancelorder", cancelorder)
handleTopicRequest("getchats", getchats)
handleTopicRequest("getrestaurantconversations", getrestaurantconversations)
handleTopicRequest("getcustomerconversations", getcustomerconversations)


handleTopicRequest("customerregister",customerregister)
handleTopicRequest("customerlogin",customerlogin)
handleTopicRequest("sendorderdetails",sendorderdetails)
handleTopicRequest("fetchordersummary",fetchordersummary)
