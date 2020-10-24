import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import '../../customer/Profile/ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import {customerLogin} from '../../../actions/customerAction'

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }
    componentDidMount() {
        let id = this.props.location.aboutProps.id
        console.log([this.props.location.aboutProps.id])
        axios.get(`http://localhost:3001/customerprofileroute/customerprofile/${id}`)
            .then((response) => {
                if (response.data.message === "success") {
                    console.log("Profile data", response.data.data[0])
                    this.props.customerLogin(response.data.data[0])
                    console.log("Store",this.props.user)
                }

            })
    }
    render() {
        let customerDetails = (
            <div class="table">
            <div class="tr-middle">
                <div class="td-11">
                    {this.props.user.profileImage ? <img src={`/uploads/${this.props.user.profileImage}`} alt="Avatar" class="photo-box-img" /> : <img src={default_image} class="photo-box-img" alt="Avatar" />}
                </div>
                <div class="td-21">
                    <h1> {this.props.user.firstName} {this.props.user.lastName} (Also known as {this.props.user.nickName})</h1>
                    <h3> {this.props.user.city}, {this.props.user.state} </h3>
                    <h5> #HeadLine {this.props.user.headline} </h5>
                    <h6> Favourites Include: {this.props.user.favourites} </h6>
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
                    <p class="details-info">{this.props.user.location}{this.props.user.city}, {this.props.user.state} {this.props.user.country}, {this.props.user.zipcode}</p>
                    <p class="details-heading">Date of Birth</p>
                    <p class="details-info">{this.props.user.DOB}</p>
                    <p class="details-heading">Yelping Since</p>
                    <p class="details-info">{this.props.user.yelpingSince}</p>
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
        return (
            <div>
            {this.props.user ? customerDetails : null}
            </div>
        )
    }

}
function mapDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return {
        customerLogin : (data) => dispatch(customerLogin(data))
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDetails));