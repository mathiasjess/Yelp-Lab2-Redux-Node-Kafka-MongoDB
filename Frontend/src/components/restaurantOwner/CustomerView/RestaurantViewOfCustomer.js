import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import '../../customer/Profile/ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { customerLogin } from '../../../actions/customerAction'
import { customerReviews } from '../../../actions/customerOtherDetailsAction'

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDetails: [],
            reviews: []
        }
    }
    async componentDidMount() {
        let reviewsResult = []
        let individualResult = {}
        console.log("Customer ID", this.props.location.aboutProps.id)
        await axios.get(`http://localhost:3001/customerprofileroute/customerprofile/${this.props.location.aboutProps.id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    console.log("Profile data", response.data.data[0])
                    this.props.customerLogin(response.data.data[0]);
                    console.log("User details", this.props.user)
                    this.customerProfile()
                }
            })
        await axios.get(`http://localhost:3001/customerreviewroute/getcustomerreviews/${this.props.location.aboutProps.id}`)
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
                    this.customerProfile()
                }

            })
    }
    customerProfile() {
        const renderprofilepage = (
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
                        <button class="btn btn-danger" onClick={() => this.props.history.push(`/chatpage`)}>
                        <span class="glyphicon glyphicon-envelope" aria-hidden="true"> Message</span>
                    </button>
                    </div>
                    <div class="td-31">
                    </div>
                </div>
                <div class="tr-bottom">
                    <div class="td-1">
                    </div>
                    <div class="td-2">
                        <h2>Reviews</h2>
                        {this.props.custReviews.reviews && this.props.custReviews.reviews.map((item, i) => {
                        return <div class="Reviews" key={i}>
                            <h4>Ratings: {item.ratings}/5</h4>
                            <div class="reviews-header-details">
                            {item.restaurantImage ? <img src={`/uploads/${item.restaurantImage }`} alt="Avatar" class="photo-box-rest" />: <img class="photo-box-rest" src={restaurant_image} alt="Avatar" /> }
                            <h5 style={{paddingTop:'1rem'}}>  {item.restaurantName}</h5>
                            </div>
                            <p style={{paddingTop:'2rem'}}><b>Date: </b><Moment>{item.reviewDate}</Moment></p>
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
        this.setState({

            renderprofilepage
        })
    }
    render() {
        return (
            <div>
                {this.state.renderprofilepage}
            </div>
        )
    }


}
function mapDispatchToProps(dispatch) {
    return {
        customerReviews: (data) => dispatch(customerReviews(data)),
        customerLogin: (data) => dispatch(customerLogin(data))
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer,
    custReviews: state.customerOtherDetailsReducer
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDetails));