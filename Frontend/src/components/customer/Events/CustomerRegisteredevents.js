import React from 'react'
import axios from 'axios'
import './events.css'
import { connect } from 'react-redux'
import default_pic from '../../../images/restaurantprofileImage.png'
import Moment from 'react-moment';
import 'moment-timezone';
import { rooturl } from '../../../config/settings';

class MainEventsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventsData: [],
        }
        this.deleteRegisteredEvent = this.deleteRegisteredEvent.bind(this)
    }
    componentDidMount() {
        console.log("ID",this.props.user._id)
        let individualEvents = {}
        let registeredEvents = []
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(rooturl+`/customereventsroute/fetchcustomerEvent/${this.props.user._id}`)
            .then((response) => {
                console.log(response.data.data.data)
                if (response.data.data.message === "success") {
                    response.data.data.data.map(event => {
                        event.events.map(event1 => {
                            event1.registeredUsers.map(reg => {
                                if (reg.customerID === this.props.user._id) {
                                    individualEvents = {
                                        restaurantName: event.restaurantName,
                                        customerID: reg.customerID,
                                        customerName: reg.customerName,
                                        eventName: event1.eventName,
                                        eventDescription: event1.eventDescription,
                                        eventDate: event1.eventDate,
                                        eventLocation: event1.eventLocation,
                                        eventHashtag: event1.eventHashtag,
                                        eventTime : event1.eventTime
                                    }
                                    registeredEvents.push(individualEvents)
                                    individualEvents = {}
                                }
                    
                            })
                        })
                    })
                    this.setState({
                        eventsData : registeredEvents
                    })
                }
                else if (response.data.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }
    deleteRegisteredEvent() {
        axios.delete(rooturl+`/customereventsroute/deleteregisteredevent/${this.props.user.id}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    alert("Deregistered successfully")
                    this.props.history.push(`/customerevents/${this.props.user.id}`)
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }

    render() {
        console.log("Refactored events", this.state.eventsData)
        return (
            <div class="table">
                <div class="tr-onerow">
                    <div class="td-onerow1">
                    </div>
                    <div class="td-onerow2">
                    <h2 style={{textAlign:'center'}}> Registered Events</h2>
                    </div>
                    <div class="td-onerow3">

                    </div>
                </div>
                <div class="tr-tworow">
                    <div class="td-tworow1">
                    </div>
                    <div class="td-tworow2">
                        {this.state.eventsData && this.state.eventsData.map((event, i) => {
                                return <div class="card">
                                    <div class="card-body">
                                        <h6 class="card-title">{event.eventName}</h6>
                                        <p>Host: {event.restaurantName}</p>
                                        <p>Description: {event.eventDescription}</p>
                                        <p><b>Timings: </b>{event.eventTime}</p>
                                        <p><b>Date: </b>{event.eventDate}</p>
                                        <p><b></b>{event.eventHashtag}</p>
                                    </div>
                                </div>
                        })}
                    </div>
                    <div class="td-tworow3">
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.customerReducer
});


export default connect(mapStateToProps)(MainEventsPage);