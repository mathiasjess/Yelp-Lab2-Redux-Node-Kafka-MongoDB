import React from 'react'
import '../UpdateRestaurantProfile.css'
import { useSelector, connect } from 'react-redux';
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import {restaurantEventAdd} from '../../../actions/restaurantAction';

class Events extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName : '',
            eventDescription : '',
            eventTime : '',
            eventDate : '',
            eventLocation : '',
            eventHashtag : '',

        }
        this.handleAddEvent= this.handleAddEvent.bind(this)
        this.addEvent = this.addEvent.bind(this)
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
            eventName : this.state.eventName,
            eventDescription : this.state.eventDescription,
            eventTime : this.state.eventTime,
            eventDate : this.state.eventDate,
            eventLocation : this.state.eventLocation,
            eventHashtag : this.state.eventHashtag           
        }
        axios.post(`http://localhost:3001/restauranteventsroute/addEvent/${this.props.user._id}`,data)
        .then(response =>{
            if(response.data.message === "success"){
                console.log(response.data.data[0].events[0])
                alert("Successfully added Event")
                this.props.restaurantEventAdd(response.data.data[0].events[0])
            }
            else if (response.data.message === "error"){
                alert("Something went wrong. Could not add event. Please try again")
            }
        })

    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Post about an event in your restaurant</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">Event Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleAddEvent}
                                    name="eventName" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Event Description</label></li>
                                <li><textarea class="inputFields"
                                    placeholder="Enter the description here"
                                    name="eventDescription" rows="4" cols="50"
                                    onChange={this.handleAddEvent}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Time</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleAddEvent}
                                    name="eventTime" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Date</label></li>
                                <li><input type="date" class="inputFields"
                                    onChange={this.handleAddEvent}
                                    name="eventDate" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Location</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleAddEvent}
                                    name="eventLocation" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Hashtags</label></li>
                                <li><textarea class="inputFields"
                                    placeholder="Enter the description here"
                                    name="eventHashtag" rows="2" cols="50"
                                    onChange={this.handleAddEvent}>
                                </textarea></li>

                            </ul>
                        </div>
                    </div>
                    <div class="SubmitUpdate">
                        <button type="submit" class="ybtn ybtn--primary" onClick={this.addEvent}><span>Add Event</span></button>
                        <Link to="#" >Cancel</Link>
                    </div>
                </form>
            </div>
        )
        
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

function mapDispatchToProps(dispatch) {
    return {
        restaurantEventAdd: (data) => dispatch(restaurantEventAdd(data))
    }
}

// export default connect(mapStateToProps)(UpdateRestaurantProfile);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));