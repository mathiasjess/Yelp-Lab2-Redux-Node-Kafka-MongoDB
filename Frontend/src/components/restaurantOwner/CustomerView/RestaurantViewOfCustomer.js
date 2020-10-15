import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import '../../customer/Profile/ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileDetails: [],
            reviews: []
        }
    }
    componentDidMount() {
        axios.all([
            axios.get('http://localhost:3001/restaurantviewofcustomer/customerprofile', { params: [this.props.location.aboutProps.id] }),
            axios.get('http://localhost:3001/restaurantviewofcustomer/getcustomerreview', { params: [this.props.location.aboutProps.id] })
        ])
        .then(axios.spread((response1, response2)=>{
            console.log(response2.data.data)
            this.setState({
                profileDetails : response1.data.data[0],
                reviews : response2.data.data
            })
        }))
    }
    render() {
        return (
            <div class="table">
                <div class="tr-middle">
                    <div class="td-11">
                    {this.state.profileDetails.profileImage ? <img src={`/uploads/${this.state.profileDetails.profileImage}`} alt="Avatar" class="photo-box-img" /> : <img src={default_image} class="photo-box-img" alt="Avatar"/>}
                    </div>
                    <div class="td-21">
                        <h1> {this.state.profileDetails.firstName} {this.state.profileDetails.lastName} (Also known as {this.state.profileDetails.nickName})</h1>
                        <h3> {this.state.profileDetails.city}, {this.state.profileDetails.state} </h3>
                        <h5> #HeadLine {this.state.profileDetails.headline} </h5>
                        <h6> Favourites Include: {this.state.profileDetails.favourites} </h6>
                    </div>
                    <div class="td-31">
                    </div>
                </div>
                <div class="tr-bottom">
                    <div class="td-1">
                    </div>
                    <div class="td-2">
                        <h2>Reviews</h2>
                        {this.state.reviews.map((review, i) => {
                            return <div class="Reviews">
                                <h4>{review.ratings}/5</h4>
                                <h5>{review.restaurantName}</h5>
                                <h6> <Moment>{review.reviewDate}</Moment></h6>
                                <h6>{review.comments}</h6>
                            </div>
                        })}
                    </div>
                    <div class="td-3">
                        <h4> About Customer</h4>
                        <p class="details-heading">Location</p>
                        <p class="details-info">{this.state.profileDetails.location}{this.state.profileDetails.city}, {this.state.profileDetails.state} {this.state.profileDetails.country}, {this.state.profileDetails.zipcode}</p>
                        <p class="details-heading">Date of Birth</p>
                        <p class="details-info">{this.state.profileDetails.DOB}</p>
                        <p class="details-heading">Yelping Since</p>
                        <p class="details-info">{this.state.profileDetails.yelpingSince}</p>
                        <p class="details-heading">Things I Love</p>
                        <p class="details-info">{this.state.profileDetails.thingsILove}</p>
                        <p class="details-heading">Find me In</p>
                        <p class="details-info">{this.state.profileDetails.findmeIn}</p>
                        <p class="details-heading">My Blog or Website</p>
                        <p class="details-info">{this.state.profileDetails.websiteDetails}</p>
                        <p class="details-heading">Email ID</p>
                        <p class="details-info">{this.state.profileDetails.email}</p>
                        <p class="details-heading">Phone Number</p>
                        <p class="details-info">{this.state.profileDetails.phoneNumber}</p>
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