import React from 'react'
import '../RestaurantHomePage.css'
import '../reviews/reviews.css'
import axios from 'axios'
import restaurantprofileImage from '../../../images/restaurantprofileImage.png'
import default_image from '../../../images/customer_default_pic.png'
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Moment from 'react-moment';



class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFullProfileFlag: true,
            showEditDishesFlag: false,
            itemID: ''
        }
    }
    render() {
        console.log(this.props.user.menuItem)
        console.log(this.props.user.events)
        const mapStyles = {
            width: '45rem',
            height: '30rem',
        };
        return (
            <div class="centeredRight" >
                <div class="header">
                    {this.props.user.restaurantImage ? <img src={`/uploads/${this.props.user.restaurantImage}`} alt="Avatar" class="card-img-top-profile" /> : <img src={restaurantprofileImage} />}
                    <div class="maps">
                        <Map
                            google={this.props.google}
                            zoom={10}
                            style={mapStyles}
                            initialCenter={{ lat: this.props.user.latitude, lng: this.props.user.longitude }}
                        >
                            <Marker position={{ lat: this.props.user.latitude, lng: this.props.user.longitude }} />
                        </Map>
                    </div>
                </div>
                <h2 class="restaurantName">{this.props.user.restaurantName}</h2>
                <div class="restaurantdetails">
                    <h5> {this.props.user.location}</h5>
                    <h5> {this.props.user.city},{this.props.user.state}</h5>
                    <h5> {this.props.user.zipcode}</h5>
                    <h5>Ph No: {this.props.user.contact}</h5>
                </div>
                <div class="restaurantdescription">
                    <p>{this.props.user.description}</p>
                    <p>{this.props.user.timings}</p>
                </div>
                <h4> Services</h4>
                <div class="services">
                    <h5>{this.props.user.curbPickup ? <span class="glyphicon glyphicon-ok">Curbside Pickup     </span> : <span class="glyphicon glyphicon-remove">Curbside Pickup</span>}</h5>
                    <h5>{this.props.user.yelpDelivery ? <span class="glyphicon glyphicon-ok">Yelp Delivery      </span> : <span class="glyphicon glyphicon-remove">Yelp Delivery</span>}</h5>
                    <h5>{this.props.user.dineIn ? <span class="glyphicon glyphicon-ok">Dine In                  </span> : <span class="glyphicon glyphicon-remove">Dine In</span>}</h5>
                </div>
                <div style={{width:"70%"}}>
                <h2>Reviews</h2>
                {this.props.user.reviews.map((review, i) => {
                   return <div class="Reviews" key = {i}>
                        <h4>Rating: {review.ratings}/5</h4>
                        <div class="review-header">
                        {review.customerImage ? <img src={`/uploads/${review.customerImage}`} alt="Avatar" class="photo-box" /> : <img  class="photo-box" src={default_image} alt="Avatar"/>}
                        <Link to= {{pathname: '/restaurantviewofcustomer',
                        aboutProps:{id: review.customerID}}}><h5>{review.customerName}</h5></Link>
                        </div>
                        <h6>Date: <Moment>{review.reviewDate}</Moment></h6>
                        <h6>Comments:{review.comments}</h6>
                    </div>
                })}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
})(withRouter(connect(mapStateToProps)(RestaurantProfile)));