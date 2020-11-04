import React from 'react'
import axios from 'axios'
import './events.css'
import { connect } from 'react-redux'
import default_pic from '../../../images/restaurantprofileImage.png'
import Moment from 'react-moment';
import 'moment-timezone';
import {restaurantEvents} from '../../../actions/customerOtherDetailsAction'
import { Link } from 'react-router-dom';
import { rooturl } from '../../../config/settings';

class MainEventsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: '',
            searchParameter: '',
            eventsData: [],
            searchFlag: false
        }
        this.captureSearchParameters = this.captureSearchParameters.bind(this)
        this.getSearchResults = this.getSearchResults.bind(this)
        this.registerForEvent = this.registerForEvent.bind(this)
        this.getAllResults = this.getAllResults.bind(this)
        this.handleorderofevents = this.handleorderofevents.bind(this)
        this.getSingleEvent = this.getSingleEvent.bind(this)
    }
    async componentDidMount() {
        let individualevent = {}
        let allEvents = []
        let x = null
        let y = null
        
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(rooturl+`/customereventsroute/fetchEvents`)
            .then((response) => {
                console.log(response.data.data.data)
                if (response.data.data.message === "success") {
                    {response.data.data.data && response.data.data.data.map(event => {
                        event.events.map(item => {
                            individualevent = {
                                restaurantId: event._id,
                                restaurantName: event.restaurantName,
                                restaurantImage: event.restaurantImage,
                                eventID: item._id,
                                eventName: item.eventName,
                                eventDescription: item.eventDescription,
                                eventTime: item.eventTime,
                                eventDate: item.eventDate,
                                eventLocation: item.eventLocation,
                                eventHashtag: item.eventHashtag,
                                registeredUsers: item.registeredUsers

                            }
                            allEvents.push(individualevent)
                            individualevent = {}
                        })
                    })}
                    console.log("Refactored",allEvents)
                    const sortedEvents = allEvents.sort((a,b)=>{
                        x = new Date(a.eventDate.slice(0,10))
                        y = new Date(b.eventDate.slice(0,10))
                        return(x-y)
                    })
                    console.log("Sorted Events", sortedEvents)
                    this.props.restaurantEvents(sortedEvents)
                    this.setState({
                        eventsData : this.props.events.events
                    })
                    // this.receivedData();
                }
            })
    }
    getSingleEvent(){
        console.log("Search Value", this.state.searchParameter)
    }
    captureSearchParameters(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleorderofevents(order){
        let x = null
        let y = null
        let sortedEvents = null
        if(order === "asc"){
                sortedEvents = this.state.eventsData.sort((a,b)=>{
                x = new Date(a.eventDate.slice(0,10))
                y = new Date(b.eventDate.slice(0,10))
                return(x-y)
            })
        }
        else{
                sortedEvents = this.state.eventsData.sort((a,b)=>{
                x = new Date(a.eventDate.slice(0,10))
                y = new Date(b.eventDate.slice(0,10))
                return(y-x)
            })  
        }
        this.setState({
            eventsData : sortedEvents
        })
    }   
    getSearchResults = (event)=>{
        event.preventDefault();
        // let searchValue = this.state.searchParameter
        console.log("Search value", this.state.searchParameter)
        // this.props.events.events.map((event)=>{
        //     if(event.eventName === searchValue){
        //         return this.setState({
        //             searchFlag : true,
        //             eventsData : event
        //         })
        //     }
        // })
    }

    registerForEvent(eventID, restaurantID) {
        const data = {
            eventId: eventID,
            restaurantId: restaurantID,
            customerId: this.props.user._id,
            customerName: this.props.user.firstName + " " + this.props.user.lastName
        }
        console.log("Data", data)
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(rooturl+`/customereventsroute/registerForEvent`, data)
            .then((response) => {
                console.log(response.data.data.data)
                if (response.data.data.message === "success") {

                    alert("Registerd successfully for event")
                }
                else if (response.data.data.message === "error") {
                    alert("Something went wrong")
                }
            })
    }
    getAllResults() {
        this.setState({
            searchFlag: false,
            eventsData: this.props.events.events
        })
    }
    render() {
        console.log("All events inside render", this.state.eventsData)
        return (
            <div class="table">
                <div class="tr-onerow">
                    <div class="td-onerow1">
                        {this.state.searchFlag && <button class="btn btn-danger" onClick={() => this.getAllResults()}>All search Results</button>}
                    </div>
                    <div class="td-onerow2">
                        <form class="search-class">
                            <input class="form-control mr-sm-2" name="searchParameter" type="text" onChange={this.captureSearchParameters} placeholder="Event Names" aria-label="Search" />
                            {/*<button class="btn btn-outline-success my-2 my-sm-0" onClick = {this.searchRestaurant} type="submit">Search</button>*/}
                            <button class="btn btn-danger" onClick={()=>this.handleorderofevents("desc")}>search</button>
                        </form>
                    </div>
                    <div class="td-onerow3">
                    </div>
                </div>
                <div class="tr-tworow">
                    <div class="td-tworow1">
                    </div>
                    <div class="td-tworow2">
                    <div>
                    <Link to ="#" onClick={()=>this.handleorderofevents("asc")}><span class = "glyphicon glyphicon-arrow-up"> Ascending</span></Link>
                    <Link to ="#" onClick={()=>this.handleorderofevents("desc")}><span class = "glyphicon glyphicon-arrow-down"> Descending</span></Link>
                    </div>
                        {this.state.eventsData && this.state.eventsData.map((event, i) => {
                                return <div class="card-events" key ={i}>
                                    <div class="card-events-body">
                                        <h4 class="card-title">{event.eventName}</h4>
                                        <p>Host: {event.restaurantName}</p>
                                        <p>Date: <Moment>{event.eventDate}</Moment></p>
                                        <div class="event-details">
                                        <button class="btn btn-danger" onClick={() => this.registerForEvent(event.eventID, event.restaurantId)}>Register</button>
                                        <button class="btn btn-primary" onClick={()=> this.props.history.push(`individualeventdetails/${event.eventID}`)}>See details</button>
                                        </div>
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
    user: state.customerReducer,
    events : state.customerOtherDetailsReducer
});
function mapDispatchToProps(dispatch) {
    return {
        restaurantEvents: (data) => dispatch(restaurantEvents(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainEventsPage);