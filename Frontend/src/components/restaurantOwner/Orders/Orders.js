import React from 'react'
import axios from 'axios'
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import '../Orders/orderhistory.css'
import Moment from 'react-moment';
import default_image from '../../../images/customer_default_pic.png'

class RestaurantOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            originalorderSummary: [],
            originalorderDetails: []
        }
        this.orderdetails = this.orderdetails.bind(this)
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
    }
    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/restaurantorders/restaurantordersummary/${this.props.user.restaurantId}`),
            axios.get(`http://localhost:3001/restaurantorders/fetchrestaurantorderdetails/${this.props.user.restaurantId}`)
        ])
            .then(axios.spread((response1, response2) => {

                this.setState({
                    orderSummary: response1.data.data,
                    orderDetails: response2.data.data,
                    originalorderSummary: response1.data.data,
                    originalorderDetails: response2.data.data,
                })
            }))

    }
    orderdetails(orderID) {
        return (
            <div>
                {this.state.orderDetails.length > 0 ? this.state.orderDetails.map(function (order, j) {
                    if (order.orderID === orderID) {
                        return (
                            <div class="order-footer" key={j}>
                                <h6>{order.dishName}</h6>
                                <h6>{order.price}</h6>
                                <h6>{order.quantity}</h6>
                            </div>
                        );
                    }
                }) : null}
                <button onClick={() => this.handleClose}>Close</button>
            </div>
        );
    }
    handleFilters(deliveryFilter){
        this.setState({
            orderSummary: this.state.originalorderSummary.filter((summary) => {
                return summary.deliveryFilter === deliveryFilter
            })

        }); 
    }

    handleAllOrders(){
        this.setState({
            orderSummary: this.state.originalorderSummary
            }) 
    }
    updateOrder = (orderID)=>{
        this.props.history.push(`/updateorder/${orderID}`)
    }
    render() {
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                    <ul>
                    <li><button class="no-show" onClick={() => { this.handleAllOrders() }}>All orders</button></li>
                    </ul>
                        <ul>
                        <h4 class="Filter-headings">Filters</h4>
                            <li><button class="no-show" onClick={()=>this.handleFilters('New Order')}>New Order</button></li>
                            <li><button class="no-show" onClick={()=>this.handleFilters('Delivered')}>Delivered</button></li>
                            <li> <button class="no-show" onClick={()=>this.handleFilters('Cancelled Order')}>Cancelled Order</button></li>
                        </ul>
                    </div>
                    <div class="td-items2">
                    <h2> Orders</h2>
                        {this.state.orderSummary.map((summary, i) => {
                            return (
                                <div class="card-order" key={i}>
                                <div class="order-header">
                                {summary.profileImage ? <img src={`/uploads/${summary.profileImage}`} alt="Avatar" class="photo-box" /> : <img  class="photo-box" src={default_image} alt="Avatar"/>}
                                    <Link to={{pathname : '/restaurantviewofcustomer', 
                                                aboutProps:
                                                {id : summary.customerId,
                                              }}}>
                                              <h5>{summary.firstName} {summary.lastName}</h5></Link>
                                </div>
                                    <div class="order-footer">
                                        <p><b>Date:</b> <Moment>{summary.Date}</Moment></p>
                                        <p><b>Total Price:</b> {summary.totalPrice}</p>
                                    </div>
                                    <div class="order-footer">
                                        <p><b>Delivery Option:</b> {summary.deliveryOption}</p>
                                        <p><b>Status:</b> {summary.delivery_status}</p>
                                        <p><b>Order Type:</b> {summary.deliveryFilter}</p>
                                        <button class = "btn btn-primary" onClick={() => this.updateOrder(summary.orderID)}>Update Order Status</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default withRouter(connect(mapStateToProps)(RestaurantOrderHistory));