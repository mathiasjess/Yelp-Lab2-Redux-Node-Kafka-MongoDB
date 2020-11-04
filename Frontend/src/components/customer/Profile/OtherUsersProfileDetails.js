import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { otheruserprofile } from '../../../actions/customerOtherDetailsAction'
import { customerReviews } from '../../../actions/customerOtherDetailsAction'
import { userfollowers } from '../../../actions/customerAction'

import { imagepath } from '../../../config/imagepath';

import { rooturl } from '../../../config/settings';

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDetails: [],
            reviews: [],
            followFlag:false
        }
        this.addFollowers = this.addFollowers.bind(this)
    }
    async componentDidMount(props) {
        let reviewsResult = []
        let individualResult = {}
        console.log("Params", this.props.match.params.id)
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(rooturl+`/customerprofileroute/customerprofile/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.data.message === "success") {
                    console.log("Profile data", response.data.data.data)
                    this.setState({
                        customerDetails: response.data.data.data
                    })
                    this.props.otheruserprofile(response.data.data.data[0]);
                }

            })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(rooturl+`/customerreviewroute/getcustomerreviews/${this.props.match.params.id}`)
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
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.put(rooturl+`/allcustomersroute/addfollowers/${this.props.match.params.id}`,data)
        .then(response => {
            if (response.data.message === "success") {
                 this.props.userfollowers(data);
            }
            else if (response.data.message === "error") {
                alert("Something went wrong")
            }
        })
    }
    render() {
        let flag = false
        if(this.props.user.otherusers.followers){
            this.props.user.otherusers.followers.map((follower,i)=>{
                if(follower.customerID === localStorage.getItem('id')){
                    return flag = true
                }
            })
        }
        let renderprofilepage = (
            <div class="table">
                <div class="tr-middle">
                    <div class="td-11">
                        {this.props.user.otherusers.profileImage ? <img src={imagepath+`${this.props.user.otherusers.profileImage}`} alt="Avatar" class="photo-box-img" /> : <img class="photo-box-img" src={default_image} alt="Avatar" />}
                    </div>
                    <div class="td-21">
                        <h1> {this.props.user.otherusers.firstName} {this.props.user.otherusers.lastName} (Also known as {this.props.user.otherusers.nickName})</h1>
                        <h3>HeadLine: #{this.props.user.otherusers.headline} </h3>
                        <h5> {this.props.user.otherusers.city}, {this.props.user.otherusers.state} </h5>
                        <h6> Favourites Include: {this.props.user.otherusers.favourites} </h6>
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
                                    {item.restaurantImage ? <img src={imagepath+`${item.restaurantImage}`} alt="Avatar" class="photo-box-rest" /> : <img class="photo-box-rest" src={restaurant_image} alt="Avatar" />}
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
                        <p class="details-info">{this.props.user.otherusers.location}{this.props.user.otherusers.city}, {this.props.user.otherusers.state} {this.props.user.otherusers.country}, {this.props.user.otherusers.zipcode}</p>
                        <p class="details-heading">Date of Birth</p>
                        <p class="details-info"><Moment>{this.props.user.otherusers.DOB}</Moment></p>
                        <p class="details-heading">Yelping Since</p>
                        <p class="details-info"><Moment>{this.props.user.otherusers.yelpingSince}</Moment></p>
                        <p class="details-heading">Things I Love</p>
                        <p class="details-info">{this.state.thingsILove}</p>
                        <p class="details-heading">Find me In</p>
                        <p class="details-info">{this.props.user.otherusers.findmeIn}</p>
                        <p class="details-heading">My Blog or Website</p>
                        <p class="details-info">{this.props.user.otherusers.websiteDetails}</p>
                        <p class="details-heading">Email ID</p>
                        <p class="details-info">{this.props.user.otherusers.email}</p>
                        <p class="details-heading">Phone Number</p>
                        <p class="details-info">{this.props.user.otherusers.phoneNumber}</p>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                {this.props.user.otherusers ? renderprofilepage : <p>Loading......</p>}
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.customerOtherDetailsReducer,
    custReviews: state.customerOtherDetailsReducer
});

function mapDispatchToProps(dispatch) {
    return {
        customerReviews: (data) => dispatch(customerReviews(data)),
        otheruserprofile: (data) => dispatch(otheruserprofile(data)),
        userfollowers:(data) => dispatch(userfollowers(data))

    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDetails));