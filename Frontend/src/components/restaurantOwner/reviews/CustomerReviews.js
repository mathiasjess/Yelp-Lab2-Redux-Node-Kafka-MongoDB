import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './reviews.css'
import default_image from '../../../images/customer_default_pic.png'
import Moment from 'react-moment';

class CustomerReviews extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            reviews : []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/reviews/getrestaurantreview/${this.props.user.restaurantId}`)
        .then(response =>{
            console.log(response.data.data)
            if(response.data.message === "success"){
                this.setState({
                    reviews: response.data.data
                })
            }
            else{
                alert("Could not fetch data. Something went wrong");
            }
        })

    }
    render(){
        return(
            <div class="container">
            <h2>Reviews</h2>
            {this.state.reviews.map((review, i) => {
               return <div class="Reviews" key = {i}>
                    <h4>Rating: {review.ratings}/5</h4>
                    <div class="review-header">
                    {review.profileImage ? <img src={`/uploads/${review.profileImage}`} alt="Avatar" class="photo-box" /> : <img  class="photo-box" src={default_image} alt="Avatar"/>}
                    <Link to= {{pathname: '/restaurantviewofcustomer',
                    aboutProps:{id: review.id}}}><h5>{review.firstName} {review.LastName}</h5></Link>
                    </div>
                    <h6>Date: <Moment>{review.reviewDate}</Moment></h6>
                    <h6>Comments:{review.comments}</h6>
                </div>
            })}
        </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(CustomerReviews);