import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
        this.handleOrderPage = this.handleOrderPage.bind(this)
        this.handleEventsPage = this.handleEventsPage.bind(this)
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/reviews/getcustomerreview/${this.props.user.id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    console.log("reviews data", response.data.data)
                    this.setState({
                        reviews: response.data.data
                    })
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
        return (
            <div class="table">
            <img src = {`../../../../../Backend/public/uploads/${this.props.user.profileImage}`}/>
                <div class="tr-middle">
                    <div class="td-11">
                    {this.props.user.profileImage ? <img src={`/uploads/${this.props.user.profileImage }`} alt="Avatar" class="photo-box-img" />: <img class="photo-box-img" src={default_image} alt="Avatar" /> }
                    </div>
                    <div class="td-21">
                        <h1> {this.props.user.firstName} {this.props.user.lastName} (Also known as {this.props.user.nickName})</h1>
                        <h3>HeadLine: #{this.props.user.headline} </h3>
                        <h5> {this.props.user.city}, {this.props.user.state} </h5>

                        <h6> Favourites Include: {this.props.user.favourites} </h6>
                    </div>
                    <div class="td-31">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to='#' class="nav-link1" onClick={this.handleUpdateRestaurantProfile} >
                                    <span class="glyphicon glyphicon-picture"/>Add Profile Photos</Link></li>
                            <li class="nav-item">
                                <Link to='/updatecustomerprofile' class="nav-link1">
                                    <span class="glyphicon glyphicon-user"/>Update your Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tr-bottom">
                    <div class="td-1">
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
                    </div>
                    <div class="td-2">
                        <h2>Reviews</h2>
                        {this.state.reviews.map((review, i) => {
                            return <div class="Reviews">
                                <h4>Ratings: {review.ratings}/5</h4>
                                <div class="reviews-header-details">
                                {review.restaurantImage ? <img src={`/uploads/${review.restaurantImage }`} alt="Avatar" class="photo-box-rest" />: <img class="photo-box-rest" src={restaurant_image} alt="Avatar" /> }
                                <h5 style={{paddingTop:'1rem'}}>  {review.restaurantName}</h5>
                                </div>
                                <p style={{paddingTop:'2rem'}}><b>Date: </b><Moment>{review.reviewDate}</Moment></p>
                                <p><b>Comments: </b>{review.comments}</p>
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
                        <p class="details-info">{this.props.user.thingsILove}</p>
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
    }

}
const mapStateToProps = state => ({
    user: state.customerReducer
});


export default withRouter(connect(mapStateToProps)(ProfileDetails));