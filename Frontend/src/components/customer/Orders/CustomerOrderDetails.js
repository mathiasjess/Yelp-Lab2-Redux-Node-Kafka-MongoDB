import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../../restaurantOwner/UpdateRestaurantProfile.css'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import default_image from '../../../images/customer_default_pic.png'
class CustomerOrderDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
        }
    }
    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/restaurantorders/individualrestaurantordersummary/${this.props.match.params.id}`),
            axios.get(`http://localhost:3001/restaurantorders/individualfetchrestaurantorderdetails/${this.props.match.params.id}`)
        ])
            .then(axios.spread((response1, response2) => {

                this.setState({
                    orderSummary: response1.data.data[0],
                    orderDetails: response2.data.data,
                })
            }))
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <div>
                        <div class = "main-link">
                        <Link to ='/customerorderhistory'><span class="glyphicon glyphicon-arrow-left"/>Return to Main Orders Page</Link>
                        </div>    
                        <h2> Orders</h2>
                            <div class="card-order">
                            <img src={`/uploads/${this.state.orderSummary.restaurantImage }`} alt="Avatar" class="photo-box-img" />
                                    <h5>{this.state.orderSummary.restaurantName}</h5>
                                <div class="order-footer">
                                    <p><b>Date: </b><Moment>{this.state.orderSummary.Date}</Moment> </p>
                                    <p><b>Total Price:</b> ${this.state.orderSummary.totalPrice}</p>
                                </div>
                                <div>
                                    <h5> Order details</h5>
                                    {this.state.orderDetails.length > 0 ? this.state.orderDetails.map(function (order, j) {
                                        return (
                                            <div class="order-footer" key={j}>
                                                <p>{order.dishName}</p>
                                                <p>{order.price}</p>
                                                <p>{order.quantity}</p>
                                            </div>
                                        );
                                    }) : null}
                                </div>
                                <div class="order-footer">
                                    <p><b>Delivery Option: </b>{this.state.orderSummary.deliveryOption}</p>
                                    <p><b>Status:  </b>{this.state.orderSummary.delivery_status}</p>
                                    <p><b>Order Type:</b> {this.state.orderSummary.deliveryFilter}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});

export default connect(mapStateToProps)(CustomerOrderDetails);