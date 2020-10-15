import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../../restaurantOwner/UpdateRestaurantProfile.css'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import default_image from '../../../images/customer_default_pic.png'
class IndividualEventDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventDetails: [],
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/events/fetchsinglevent/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data.data[0])
                if (response.data.message === "success") {
                    this.setState({
                        eventDetails: response.data.data[0],
                    })
                }
            })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div>
                    <div class="main-link">
                        <Link to='/mainevents'><span class="glyphicon glyphicon-arrow-left" />Return to Main Events Page</Link>
                    </div>
                    <h2> Orders</h2>
                    <div class="card-order">
                        <h4>{this.state.eventDetails.eventName}</h4>
                        <p><b>Event Details:</b>{this.state.eventDetails.eventDescription}</p>
                        <p><b>Timings: </b> {this.state.eventDetails.eventTime}</p>
                        <p><b>Date: </b> {this.state.eventDetails.eventDate}</p>
                        <p><b>Location: </b>{this.state.eventDetails.eventLocation}</p>
                        <p>{this.state.eventDetails.eventHashtag}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});

export default connect(mapStateToProps)(IndividualEventDetails);