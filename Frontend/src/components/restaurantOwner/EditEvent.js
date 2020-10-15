import React from 'react'
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import axios from 'axios';

class EditEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId : '',
            eventName : '',
            eventDescription : '',
            eventTime : '',
            eventDate : '',
            eventLocation : '',
            eventHashtag : ''  
        }
        this.handleAddEvent = this.handleAddEvent.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
    }
    handleAddEvent(event){
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    addEvent(event){
        event.preventDefault();
        const data = {
            eventId : this.props.match.params.id,
            eventName : this.state.eventName,
            eventDescription : this.state.eventDescription,
            eventTime : this.state.eventTime,
            eventDate : this.state.eventDate,
            eventLocation : this.state.eventLocation,
            eventHashtag : this.state.eventHashtag 
        }
        axios.put(`http://localhost:3001/restaurantevents/updatesingleevent`,data)
        .then(response => {
            if (response.data.message === "success") {
                // console.log('Getting Cookie ID', Cookies.get('id'))
                alert('Updated Event', this.state.dishName)
                this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                
            }
            else if (response.data.message === "error") {
                alert("Something Went wrong. Could not update Event. Please try again")
                this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
            }
        }) 
    }
    deleteEvent(ID){
        axios.delete(`http://localhost:3001/restaurantevents/deleteEvent/${this.state.eventID}`)
        .then(response =>{
            if(response.data.message ==="success"){
                alert("Deleted Event")
                this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
            }
            else if (response.data.message === "error"){
                alert("Something went wrong. Could not delete Event. Please try again")
            }
        })
    } 
    componentDidMount(){
        console.log(this.props.match.params.id)
        axios.get(`http://localhost:3001/restaurantevents/fetchsingleevent/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({
                restaurantId : response.data.data[0].restaurantId,
                eventName : response.data.data[0].eventName,
                eventDescription : response.data.data[0].eventDescription,
                eventTime : response.data.data[0].eventTime,
                eventDate : response.data.data[0].eventDate,
                eventLocation : response.data.data[0].eventLocation,
                eventHashtag : response.data.data[0].eventHashtag
            })
        })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
            <h1 class="page-title">Edit Event</h1>
            <form>
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <ul>
                            <li class="BusinessName"><label class="u-nowrap">Event Name</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventName}
                                name="eventName" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Event Description</label></li>
                            <li><textarea class="inputFields"
                            placeholder = {this.state.eventDescription}
                                name="eventDescription" rows="4" cols="50"
                                onChange={this.handleAddEvent}>
                            </textarea></li>
                            <li class="BusinessName"><label class="u-nowrap">Time</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventTime}
                                name="eventTime" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Date</label></li>
                            <li><input type="date" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventDate}
                                name="eventDate" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Location</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventLocation}
                                name="eventLocation" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Hashtags</label></li>
                            <li><textarea class="inputFields"
                            placeholder = {this.state.eventHashtag}
                                name="eventHashtag" rows="2" cols="50"
                                onChange={this.handleAddEvent}>
                            </textarea></li>

                        </ul>
                    </div>
                </div>
                <div class="SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.addEvent}><span>Update Event</span></button>
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.deleteEvent}><span>Delete Event</span></button>
                </div>
            </form>
        </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(EditEvent);