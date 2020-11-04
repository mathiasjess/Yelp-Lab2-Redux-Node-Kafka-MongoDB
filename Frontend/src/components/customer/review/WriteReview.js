import React from 'react'
import '../../restaurantOwner/RestaurantHomePage.css'
import {connect} from 'react-redux'
import axios from 'axios'
import {restaurantReviewAdd} from '../../../actions/restaurantAction'
import {customerReviews} from '../../../actions/customerOtherDetailsAction'
import { rooturl } from '../../../config/settings';

class WriteReview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            restaurantId:'',
            customerId:'',
            reviewDate:'',
            ratings:'',
            comments:'',
        }
        this.addReview = this.addReview.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
    }
    handleAddEvent(event){
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    addReview(event){
        event.preventDefault();
        const sendrestaurantdata = {
            customerID : this.props.user._id,
            restaurantID : this.props.restaurant._id,
            customerName : this.props.user.firstName + ' '+ this.props.user.lastName,
            customerImage : this.props.user.profileImage,
            reviewDate : new Date(),
            ratings: this.state.ratings,
            comments : this.state.comments
        }
        const customerdata = {
            restaurantID : this.props.restaurant._id,
            restaurantName : this.props.restaurant.restaurantName,
            customerImage : this.props.user.profileImage,
            reviewDate : new Date(),
            ratings: this.state.ratings,
            comments : this.state.comments
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(rooturl+`/customerreviewroute/writereview`,sendrestaurantdata)
        .then((response)=>{
            if(response.data.data.message === "success"){
                this.props.restaurantReviewAdd(sendrestaurantdata)
                this.props.customerReviews(customerdata)

                alert("Review added")
                    this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)

            }
            else if(response.data.data.message === "error"){
                alert("You have already written a review for this restaurant. Please edit the existing review")
            }
        })
    }
    render(){
        return(
            <div class="biz-site-expanded-grid-content-column" style={{marginTop: '5%'}}>
            <button class = "btn btn-primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}> Go Back to Restaurant Page</button>
            <form>
            <h2 class="page-title">Write a review</h2>
                <div class="biz-info-section">
                        <ul>
                            <li class="BusinessName"><label class="u-nowrap">Ratings</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventName}
                                name="ratings" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Comments</label></li>
                            <li><textarea class="inputFields"
                            placeholder = {this.state.eventDescription}
                                name="comments" rows="4" cols="50"
                                onChange={this.handleAddEvent}>
                            </textarea></li>
                        </ul>
                    </div>
                <div class="SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.addReview}><span>Submit Review</span></button>
                    <button type="submit" class="ybtn ybtn--primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}><span>Cancel Review</span></button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer,
    restaurant : state.restaurantReducer
});

function mapDispatchToProps(dispatch) {
    return {
        restaurantReviewAdd: (data) => dispatch(restaurantReviewAdd(data)),
        customerReviews : (data) => dispatch(customerReviews(data))

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(WriteReview);