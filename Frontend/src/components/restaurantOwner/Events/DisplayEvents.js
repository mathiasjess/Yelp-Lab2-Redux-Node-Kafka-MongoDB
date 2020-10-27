import React from 'react'
import '../RestaurantHomePage.css'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import '../Paginate.css'
import Moment from 'react-moment';



class DisplayEvents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.vieweventDetails = this.vieweventDetails.bind(this)
        this.registeredList = this.registeredList.bind(this)
    }
    vieweventDetails(eventIDDetails) {
        this.props.history.replace(`/editevent/${eventIDDetails}`)
    }

    registeredList(eventIDDetails) {
        this.props.history.replace(`/eventlist/${eventIDDetails}`)
    }

    componentDidMount() {
        this.receivedData()
    }


    receivedData() {
        const data = this.props.user.events;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((event,i) => <React.Fragment>
         <div class="card-menu" key={i}>
            <div class="card-items">
                <h4 style={{ textAlign: "center" }}><b>{event.eventName}</b></h4>
                <p><b> Details: </b>{event.eventDescription}</p>
                <p><b>Timings: </b> {event.eventTime}</p>
                <p><b>Date: </b><Moment>{event.eventDate}</Moment></p>
                <p><b>Location: </b>{event.eventLocation}</p>
                <p><b>{event.eventHashtag}</b></p>
                <div class="event-actions">
                    <button class="btn btn-primary" value={event._id} onClick={() => this.vieweventDetails(event._id)}>Edit Event</button>
                    <button class="btn btn-primary" value={event._id} onClick={() => this.registeredList(event._id)}>Registered List</button>
                </div>
            </div>
        </div>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            postData
        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    render() {
        return (
            <div class="menu">
                <h2 style={{ textAlign: 'center' }}>Events Page</h2>
                <div class="flex-display-items">
                    {this.state.postData}
                </div>
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(DisplayEvents);