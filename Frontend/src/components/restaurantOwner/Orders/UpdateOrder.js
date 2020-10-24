import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../UpdateRestaurantProfile.css'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import default_image from '../../../images/customer_default_pic.png'
class UpdateOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
            optionValue: '',
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.updateOrderStatus = this.updateOrderStatus.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    componentDidMount() {
        this.props.user.orders && this.props.user.orders.map(order=>{
            if(order._id === this.props.match.params.id)
            return this.setState({
                orderSummary : order
            })
        })
        // axios.all([
        //     axios.get(`http://localhost:3001/restaurantorders/individualrestaurantordersummary/${this.props.match.params.id}`),
        //     axios.get(`http://localhost:3001/restaurantorders/individualfetchrestaurantorderdetails/${this.props.match.params.id}`)
        // ])
        //     .then(axios.spread((response1, response2) => {
        //         console.log(response1.data.data[0])
        //         this.setState({
        //             orderSummary: response1.data.data[0],
        //             orderDetails: response2.data.data,
        //             optionValue: response1.data.data[0].delivery_status
        //         })
        //     }))
    }
    handleCategoryChange(event) {
        event.preventDefault();
        this.setState({
            optionValue: event.target.value
        })
    }
    updateOrderStatus(event) {
        event.preventDefault();
        console.log("Delivery Filter", this.state.orderSummary.deliveryFilter)

        let deliveryFilter = null;
        if(this.state.optionValue === "Picked Up" || this.state.optionValue === "Delivered"){
            deliveryFilter = "Delivered"
        }
        else{
            deliveryFilter = this.state.orderSummary.deliveryFilter
        }
        console.log("Delivery Filter", deliveryFilter)

        const data = {
            orderID: this.state.orderSummary._id,
            delivery_status: this.state.optionValue,
            deliveryFilter : deliveryFilter
        }
        console.log("Data", data)
        axios.put('http://localhost:3001/restaurantordersroute/updateorderstatus', data).
            then(response => {
                if (response.data.message === "success") {
                    alert("Updated Order Status")
                    this.props.history.push('/orders')
                }
                else{
                    alert("Something went wrong. Could not cancel order")
                }
            })

    }
    cancelOrder(event) {
        event.preventDefault();
        const data = {
            orderID: this.state.orderSummary._id,
            delivery_status: 'Cancelled Order',
            deliveryFilter: 'Cancelled Order'
        }

        axios.put('http://localhost:3001/restaurantordersroute/cancelorder', data).
            then(response => {
                if (response.data.message === "success") {
                    alert("Cancelled Order")
                    this.props.history.push('/orders')
                }
                else{
                    alert("Something went wrong. Could not cancel order")
                }
            })
    }

    render() {
        console.log("Details", this.state.orderSummary.orderDetails)
        let status = null;
        if (this.state.orderSummary.deliveryOption === 'pickup') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.state.orderSummary.delivery_status}>{this.state.orderSummary.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="Pick Up Ready">Pick Up Ready</option>
                <option value="Picked Up">Picked Up</option>
            </select>)
        }
        else if (this.state.orderSummary.deliveryOption === 'delivery') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.state.orderSummary.delivery_status}>{this.state.orderSummary.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="On the Way">On the Way</option>
                <option value="Delivered">Delivered</option>
            </select>)
        }
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <div>
                        <div class = "main-link">
                        <Link to ='/orders'><span class="glyphicon glyphicon-arrow-left"/>Return to Main Orders Page</Link>
                        </div>    
                        <h2> Orders</h2>
                            <div class="card-order">
                                <Link to={{
                                    pathname: '/restaurantviewofcustomer',
                                    aboutProps:
                                    {
                                        id: this.state.orderSummary.customerID,
                                    }
                                }}>
                                    <h5>{this.state.orderSummary.firstName} {this.state.orderSummary.lastName}</h5></Link>
                                <div class="order-footer">
                                    <p><b>Date: </b><Moment>{this.state.orderSummary.Date}</Moment> </p>
                                    <p><b>Total Price:</b> ${this.state.orderSummary.totalPrice}</p>
                                </div>
                                <div>
                                    <h5> Order details</h5>
                                    {this.state.orderSummary.orderDetails && this.state.orderSummary.orderDetails.map(function (order, j) {
                                        return (
                                            <div class="order-footer" key={j}>
                                                <p>{order.dishName}</p>
                                                <p>{order.price}</p>
                                                <p>{order.quantity}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div class="order-footer">
                                    <p><b>Delivery Option: </b>{this.state.orderSummary.deliveryOption}</p>
                                    <p><b>Status:  </b>{this.state.orderSummary.delivery_status}</p>
                                    <p><b>Order Type:</b> {this.state.orderSummary.deliveryFilter}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div class="biz-info-row">
                        <h2>Update Order Status</h2>
                            <ul>
                                <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                                <li>
                                <div class="order-update">
                                    {status}
                                    <button class="btn btn-primary" onClick={this.updateOrderStatus}>Update Order Status</button>
                                    <button class="btn btn-danger" onClick={this.cancelOrder}>Cancel Order</button>
                                </div>
                                </li>
                            </ul>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(UpdateOrder);