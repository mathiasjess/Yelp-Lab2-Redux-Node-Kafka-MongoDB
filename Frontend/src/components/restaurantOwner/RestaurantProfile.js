import React from 'react'
import './RestaurantHomePage.css'
import axios from 'axios'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Moment from 'react-moment';



class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuData: [],
            eventData: [],
            showFullProfileFlag: true,
            showEditDishesFlag: false,
            itemID: ''
        }
        this.editDish = this.editDish.bind(this)
        this.vieweventDetails = this.vieweventDetails.bind(this)
        this.registeredList = this.registeredList.bind(this)
    }
    editDish(ID) {
        this.props.history.replace(`/editdish/${ID}`);
    }

    vieweventDetails(eventIDDetails) {
        this.props.history.replace(`/editevent/${eventIDDetails}`)
    }

    registeredList(eventIDDetails) {
        this.props.history.replace(`/eventlist/${eventIDDetails}`)
    }

    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.user.restaurantId}`),
            axios.get(`http://localhost:3001/restaurantevents/fetchEvents/${this.props.user.restaurantId}`)
        ])
            .then(axios.spread((response1, response2) => {
                this.setState({
                    menuData: response1.data.data,
                    eventData: response2.data.data
                })
            }))
    }
    render() {
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
                <div class="menu">
                <h2>Menu</h2>
                <div class="flex-display-items">
                {this.state.menuData.map((menu, i) => {
                    return <div class="card-menu" key={i}>
                        <div class="card-items">
                        <h5 style={{textAlign: 'center', lineHeight:'2rem'}}><b>{menu.dishName}</b></h5>
                            <img src={`/uploads/${menu.dishImage1}`} alt="Avatar" class="card-img-top-menu" />
                            <p style={{lineHeight:'2rem'}}><b><span class="glyphicon glyphicon-th-list"></span>Category: </b> {menu.dishCategory}</p>
                            <p><b>Description: </b>{menu.dishDescription}</p>
                            <p><b>{menu.price}</b></p>
                        </div>
                        <button class="btn btn-primary" value={menu.itemID} onClick={() => this.editDish(menu.itemID)}>View Details</button>
                    </div>
                })}
                </div>
                </div>

                <div class="menu">
                    <h2>Events</h2>
                    <div class="flex-display-items">
                        {this.state.eventData.map((event, i) => {
                            return <div class="card-menu" key={i}>
                                <div class="card-items">
                                    <h4 style={{ textAlign: "center" }}><b>{event.eventName}</b></h4>
                                    <p><b> Details: </b>{event.dishDescription}</p>
                                    <p><b>Timings: </b> {event.eventTime}</p>
                                    <p><b>Date: </b><Moment>{event.eventDate}</Moment></p>
                                    <p><b>Location: </b>{event.eventLocation}</p>
                                    <p><b>{event.eventHashtag}</b></p>
                                    <div class="event-actions">
                                        <button class="btn btn-primary" value={event.eventId} onClick={() => this.vieweventDetails(event.eventId)}>Edit Event</button>
                                        <button class="btn btn-primary" value={event.eventId} onClick={() => this.registeredList(event.eventId)}>Registered List</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

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