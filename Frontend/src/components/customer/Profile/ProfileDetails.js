import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { customerReviews } from '../../../actions/customerOtherDetailsAction'
import { customerLogin } from '../../../actions/customerAction'
import { userfollowers } from '../../../actions/customerAction'

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDetails: [],
            reviews: [],
            followFlag:false
        }
        this.handleOrderPage = this.handleOrderPage.bind(this)
        this.handleEventsPage = this.handleEventsPage.bind(this)
        this.addFollowers = this.addFollowers.bind(this)
    }
    async componentDidMount(props) {
        let reviewsResult = []
        let individualResult = {}
        console.log("Params", this.props.match.params.id)
        await axios.get(`http://localhost:3001/customerprofileroute/customerprofile/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    console.log("Profile data", response.data.data)
                    this.setState({
                        customerDetails: response.data.data
                    })
                    this.props.customerLogin(response.data.data[0]);
                }

            })
        await axios.get(`http://localhost:3001/customerreviewroute/getcustomerreviews/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    console.log(response.data.data)
                    {
                        response.data.data && response.data.data.map(item => {
                            individualResult = {
                                restaurantID: item._id,
                                restaurantName: item.restaurantName,
                                restaurantImage: item.restaurantImage,
                                reviewDate: item.reviews[0].reviewDate,
                                ratings: item.reviews[0].ratings,
                                comments: item.reviews[0].comments
                            }
                            reviewsResult.push(individualResult)
                            individualResult = {}
                        })
                    }
                    console.log("Refactored reviews", reviewsResult)
                    this.props.customerReviews(reviewsResult)
                }

            })
    }
    async addFollowers(){
        const data ={
            customerID: localStorage.getItem('id'),
            customerName : localStorage.getItem('name')
        }
        console.log("Data for following", data)
        await axios.put(`http://localhost:3001/allcustomersroute/addfollowers/${this.props.match.params.id}`,data)
        .then(response => {
            if (response.data.message === "success") {
                 this.props.userfollowers(data);
            }
            else if (response.data.message === "error") {
                alert("Something went wrong")
            }
        })
    }
    handleOrderPage(custID) {
        this.props.history.push('/customerorderhistory')
    }

    handleEventsPage(custID) {
        this.props.history.push(`/customerevents/${custID}`)
    }
    render() {
        let flag = false
        if(this.props.user.followers){
            this.props.user.followers.map((follower,i)=>{
                if(follower.customerID === localStorage.getItem('id')){
                    return flag = true
                }
            })
        }
        let renderprofilepage = (
            <div class="table">
                <div class="tr-middle">
                    <div class="td-11">
                        {this.props.user.profileImage ? <img src={`/uploads/${this.props.user.profileImage}`} alt="Avatar" class="photo-box-img" /> : <img class="photo-box-img" src={default_image} alt="Avatar" />}
                    </div>
                    <div class="td-21">
                        <h1> {this.props.user.firstName} {this.props.user.lastName} (Also known as {this.props.user.nickName})</h1>
                        <h3>HeadLine: #{this.props.user.headline} </h3>
                        <h5> {this.props.user.city}, {this.props.user.state} </h5>
                        <h6> Favourites Include: {this.props.user.favourites} </h6>
                        {localStorage.getItem('id') !== this.props.match.params.id ?
                            <div class="buttonsuser">
                            {flag === true && <button class="btn btn-danger">
                            <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">Following</span>
                            </button> }
                            {flag === false && <button class="btn btn-danger"><Link to ="#" onClick={() =>this.addFollowers()}>
                                    <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">Follow</span></Link>
                                </button> }
                                <button class="btn btn-default" onClick={() => this.props.history.push('/mainevents')}><span class="glyphicon glyphicon-bookmark">Followers</span></button>
                            </div>
                            : null}
                    </div>
                    <div class="td-31">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to='#' class="nav-link1" onClick={this.handleUpdateRestaurantProfile} >
                                    <span class="glyphicon glyphicon-picture" />Add Profile Photos</Link></li>
                            <li class="nav-item">
                                <Link to='/updatecustomerprofile' class="nav-link1">
                                    <span class="glyphicon glyphicon-user" />Update your Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tr-bottom">
                    <div class="td-1">
                        {localStorage.getItem('id') === this.props.match.params.id ?
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link to='#' class="nav-link is-active" onClick={this.handleMainProfile}>Profile Overview</Link>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <button class="profileLinks" onClick={() => this.handleOrderPage(this.props.user.id)}>Order History</button>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <button class="profileLinks" onClick={() => this.handleEventsPage(this.props.user.id)}>Events</button>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <Link to='/viewcustomerreviews' class="nav-link disabled" >Reviews</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link" onClick={this.handleAddMenu}>Friends</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled">Review Drafts</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Compliments</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Tips</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Bookmarks</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Collections</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Check-Ins</Link>
                                </li>
                            </ul>
                            : null}
                    </div>
                    <div class="td-2">
                        <h2>Reviews</h2>
                        {this.props.custReviews.reviews && this.props.custReviews.reviews.map((item, i) => {
                            return <div class="Reviews" key={i}>
                                <h4>Ratings: {item.ratings}/5</h4>
                                <div class="reviews-header-details">
                                    {item.restaurantImage ? <img src={`/uploads/${item.restaurantImage}`} alt="Avatar" class="photo-box-rest" /> : <img class="photo-box-rest" src={restaurant_image} alt="Avatar" />}
                                    <h5 style={{ paddingTop: '1rem' }}>  {item.restaurantName}</h5>
                                </div>
                                <p style={{ paddingTop: '2rem' }}><b>Date: </b><Moment>{item.reviewDate}</Moment></p>
                                <p><b>Comments: </b>{item.comments}</p>
                            </div>
                        })}
                    </div>
                    <div class="td-3">
                        <h2> About Me</h2>
                        <p class="details-heading">Location</p>
                        <p class="details-info">{this.props.user.location}{this.props.user.city}, {this.props.user.state} {this.props.user.country}, {this.props.user.zipcode}</p>
                        <p class="details-heading">Date of Birth</p>
                        <p class="details-info"><Moment>{this.props.user.DOB}</Moment></p>
                        <p class="details-heading">Yelping Since</p>
                        <p class="details-info"><Moment>{this.props.user.yelpingSince}</Moment></p>
                        <p class="details-heading">Things I Love</p>
                        <p class="details-info">{this.state.thingsILove}</p>
                        <p class="details-heading">Find me In</p>
                        <p class="details-info">{this.props.user.findmeIn}</p>
                        <p class="details-heading">My Blog or Website</p>
                        <p class="details-info">{this.props.user.websiteDetails}</p>
                        <p class="details-heading">Email ID</p>
                        <p class="details-info">{this.props.user.email}</p>
                        <p class="details-heading">Phone Number</p>
                        <p class="details-info">{this.props.user.phoneNumber}</p>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                {this.props.user ? renderprofilepage : <p>Loading......</p>}
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.customerReducer,
    custReviews: state.customerOtherDetailsReducer
});

function mapDispatchToProps(dispatch) {
    return {
        customerReviews: (data) => dispatch(customerReviews(data)),
        customerLogin: (data) => dispatch(customerLogin(data)),
        userfollowers:(data) => dispatch(userfollowers(data))

    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDetails));